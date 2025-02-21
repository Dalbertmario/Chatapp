import mongoose from "mongoose";


const  userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    password : {type:String,required:true},
    email :{type:String,required:true},
    role:{type:String,required:true},
    contact:{type:Array,required:false},
    socketid:{type:String,required:false}
})

const User  = mongoose.model('users',userSchema);

export default User;