import mongoose from "mongoose";
import Message from "../model/MessaageModel.js";
import User from "../model/userModel.js";

export const Contact = async (req, res) => {
  const { id } = req.params;

  try {
      const responce = await User.findOne({ _id: id }).select('contact');
      
      if (!responce || responce.contact.length === 0) {
          return res.status(404).json({ message: "No user is found" });
      }
    
      const message = await Message.find({
          reciverId: id,
          status: "unseen"
      });
     
      const notification = {}; 
      const contactIds = responce.contact.map(id => new mongoose.Types.ObjectId(id));
      const NewMsg = await Message.aggregate([
        {
          $match: {
            senderId: { $in: contactIds } // Ensure ObjectId format
          }
        },
        {
          $sort: { timeStamp: -1 }
        },
        {
          $group: {
            _id: "$senderId",
            latestMessage: { $first: "$$ROOT" }
          }
        },
        {
          $replaceRoot: { newRoot: "$latestMessage" }
        }
      ]);
      
      const users = await User.find({ _id: { $in:responce.contact } }).select('name');
    
      for (let i = 0; i < users.length; i++) {
          if (!notification[users[i].name]) {
              notification[users[i].name] = message.filter(el => el.senderId.equals(users[i]._id));
          }
      }
      if (users.length === 0) {
          return res.status(200).json([]);
      }

      const notificationConst = Object.entries(notification).map(([name, notification]) => {
        return {
           notification: notification.length,
          _id: users.find(el => el.name === name), 
           name: name
           
        };
      });
      return res.status(200).json(notificationConst);

  } catch (er) {
      console.log(er.message);
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
   console.log(monitorMsg)
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
