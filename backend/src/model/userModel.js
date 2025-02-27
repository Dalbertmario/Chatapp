import mongoose from "mongoose";


const  userSchema = new mongoose.Schema({
    googleId:{type:String,unique:true},
    name:{type:String,required:true},
    role:{type:String,required:true},
    email:{type:String,require:false,unique:true},
    password:{type:String,required:false},
    contact:{type:Array,required:false},
    socketid:{type:String,required:false},
    status:{type:String,required:false},
    profile:{type:String,default:null,required:false},
    iv:{type:String,required:false},
    privateKey:{type:String,required:false},
    publicKey:{type:String,required:false},
    hex:{type:String,required:false}
})

const User  = mongoose.model('users',userSchema);

export default User;