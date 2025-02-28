import mongoose from "mongoose";


const Messageing  = new mongoose.Schema({
    reciverId: {type:mongoose.Schema.Types.ObjectId,ref:"users",required:true},
    senderId : {type:mongoose.Schema.Types.ObjectId,ref:"users",required:true},
    message:{type:String,required:true},
    status:{type:String,default:"unseen",required:false},
    timeStamp:{type:Date,default:Date.now},
    iv:{type:String,required:false},
    aeskey:{type:String,required:false}
})

const Message = mongoose.model('Messages',Messageing)

export default Message