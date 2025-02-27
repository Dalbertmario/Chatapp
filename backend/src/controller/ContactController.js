import mongoose from "mongoose";
import Message from "../model/MessaageModel.js";
import User from "../model/userModel.js";
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const Contact = async (req, res) => {
  const { id } = req.params;


  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const responce = await User.findOne({ _id: new mongoose.Types.ObjectId(id) }).select("contact");

    if (!responce || !responce.contact || responce.contact.length === 0) {
      return res.status(404).json({ message: "No user found" });
    }
    const contactIds = responce.contact
      .filter(contactId => mongoose.Types.ObjectId.isValid(contactId))
      .map(contactId => new mongoose.Types.ObjectId(contactId));

    const message = await Message.find({
      reciverId: id,
      status: "unseen"
    });

    const notification = {};
    const users = await User.find({ _id: { $in: contactIds } }).select(["name","profile"]);

    for (let i = 0; i < users.length; i++) {
      if (!notification[users[i].name]) {
        notification[users[i].name] = message.filter(el => el.senderId.equals(users[i]._id));
      }
    }
    
    if (users.length === 0) {
      return res.status(200).json([]);
    }
    //////////////////////////////////////////////////////////////////////////////////
    async function fetchLatestMessage(ids) {
      if (!ids) return null;
      try {
        let text;
        
        const messages = await Message.find({ senderId: ids,reciverId:id }).sort({timeStamp:-1}).limit(1)
        const sendIngMessage = await Message.find({senderId:id,reciverId:ids}).sort({timeStamp:-1}).limit(1)
       for(let i =0 ; i< messages.length;i++){
          if(new Date(messages[i].timeStamp) > new Date(sendIngMessage[i]?.timeStamp|| null)){
            text= messages[i].message
          }else{
            text= sendIngMessage[i].message
          }
       }
        return text ? text : null;
      } catch (error) {
        console.error("Error fetching messages:", error);
        return null;
      }
    }


    ////////////////////////////////////////////////////////////////////////////
    const notificationConst = await Promise.all(
      Object.entries(notification).map(async ([name, notifications]) => {
        const userss = users.find(el => el.name === name);
        return {
          notification: notifications.length,
          _id: userss,
          name: name,
          latest: userss ? await fetchLatestMessage(userss._id._id) : null
        };
      })
    );
    /////////////////////////////////////////////////////////////////////////
    const sortedNotifications = notificationConst.sort((a, b) => b.notification - a.notification);
    return res.status(200).json(sortedNotifications);
  } catch (er) {
    console.error(er);
    return res.status(500).json({ message: "Unexpected error" });
  }
};


export const Messages = async (req, res) => {
  const { repId, senderId } = req.body;

  try {
    const response = await Message.find({
      $or: [
        { reciverId: new mongoose.Types.ObjectId(repId), senderId: new mongoose.Types.ObjectId(senderId) },
        { reciverId: new mongoose.Types.ObjectId(senderId), senderId: new mongoose.Types.ObjectId(repId) }
      ]
    });

    if (response.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(response);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "An error occurred while fetching messages", error: err.message });
  }
};

export const Status = async (req, res) => {
  const { senderId, repId } = req.body;
  if (!senderId || !repId) {
    return res.status(400).json({ message: "SenderId or repId is missing" });
  }

  try {
    const monitorMsg = await Message.find({
      senderId: new mongoose.Types.ObjectId(repId),
      reciverId: new mongoose.Types.ObjectId(senderId),
      status: { $ne: "seen" }
    }).select("_id");
    const messageIds = monitorMsg.map((el) => el._id);

    if (messageIds.length === 0) {
      return res.status(200).json({ message: "No unseen messages to update" });
    }

    const result = await Message.updateMany(
      { _id: { $in: messageIds } },
      { $set: { status: "seen" } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "No messages found to update" });
    }

    return res.status(200).json({ message: `Updated ${result.modifiedCount} messages successfully`, data: result });

  } catch (err) {
    console.error("Error in status update:", err);
    return res.status(500).json({ message: "Unexpected error", error: err.message });
  }
};
