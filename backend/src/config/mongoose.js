import mongoose from "mongoose";

const connectDb= ()=>{
mongoose.connect('mongodb://localhost:27017/chatApp',{
}).then(()=>{
    console.log('MongoDb connected')
}).catch((err)=>{
    console.error('connection error',err)
    process.exit(1)
})
}

export default connectDb;