import mongoose from "mongoose";

const connectDb= async ()=>{
mongoose.connect('mongodb://localhost:27017/chatApp',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log('MongoDb connected')
}).catch((err)=>{
    console.error('connection error',err)
    process.exit(1)
})
}

export default connectDb;