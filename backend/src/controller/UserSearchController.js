import User from "../model/userModel.js"
import mongoose from "mongoose";

export const search = async (req,res)=>{
    const {search} = req.query
    const {userid} = req.params
    if(!search){
        res.status(400).json({message:'not found'})
    }
    try{
      const user = await User.find({
        name:{$regex:search,$options:"i"},
        _id : {$ne :new mongoose.Types.ObjectId(userid) }
      }).select(['name','id'])
      
      if(user.length === 0){
        return res.status(404).json({message:"No user found"})
      }
      res.status(200).json(user)
    }catch(err){
      res.status(500).json({message:"Unexpected error"})
    }
}