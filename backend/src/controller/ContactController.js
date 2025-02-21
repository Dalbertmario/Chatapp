import mongoose from "mongoose"
import Message from "../model/MessaageModel.js"
import User from "../model/userModel.js"

export const Contact = async (req,res)=>{
    const {id} = req.params
   
    try{
      const responce = await User.findOne({_id:id}).select('contact')
      if(responce.length === 0){
        res.status(404).json({message:"No user is found"})
      } 
   
      const users = await User.find({_id:{$in:responce.contact}}).select('name')
      if(users.length === 0 ){
        res.status(200).json([])
      }
      res.status(200).json(users)
    }catch(er){
      res.status(500).json({message:"Unexpected error"})
      console.log(er.message)
    }
}

export const Messages = async (req,res)=>{
  const {repId,senderId} = req.body

  try{ 
     const responce = await Message.find({$or: [
      { reciverId: repId, senderId: senderId },
      { reciverId: senderId, senderId: repId }
    ]})
     if(responce.length === 0) {
       return res.status(200).json([])
     }
     res.status(200).json(responce)
  }catch(err){
    console.log(err.message)
  }
}

export const Status = async (req, res) => {
  const { senderId, repId } = req.body;
  console.log(senderId, repId);

  if (!senderId || !repId) {
    return res.status(400).json({ message: "SenderId or repId is missing" });
  }

  try {
  
    const monitorMsg = await Message.find({
      senderId: new mongoose.Types.ObjectId(repId),
      reciverId: new mongoose.Types.ObjectId(senderId),
      status: { $ne: "seen" } 
    }).select("_id");

    const messageIds = monitorMsg.map(el => el._id);

    if (messageIds.length > 0) {
      const result = await Message.updateMany(
        { _id: { $in: messageIds } },
        { $set: { status: "seen" } }
      );

      if (result.modifiedCount === 0) {
        return res.status(404).json({ message: "No messages found to update" });
      }

      return res.status(200).json({ message: `Updated ${result.modifiedCount} messages successfully`, data: result });
    }

    return res.status(200).json({ message: "No unseen messages to update" });

  } catch (err) {
    console.error("Error in status update:", err);
    res.status(500).json({ message: "Unexpected error", error: err.message });
  }
};
