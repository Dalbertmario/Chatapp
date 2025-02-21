import Message from '../model/MessaageModel.js'
import User from '../model/userModel.js'

function ChatRouter(io) {
    io.on('connection', async (socket) => {

        // Register the user
        socket.on('register', async (id) => {
            await User.findByIdAndUpdate(id, { socketid: socket.id });
        });
        // Handle messages
        socket.on('message', async (msg) => {
            
            try {
                const newMsg = new Message({
                    reciverId: msg.reciverID,
                    senderId: msg.senderID,
                    message: msg.message,
                });
                await newMsg.save();
                console.log(newMsg)
                const reciverSocket = await User.findOne({ _id: msg.reciverID }).select('socketid');
                if (reciverSocket.socketid) {
                    await Message.findOneAndUpdate({_id:newMsg._id},{status:'seen'})
                    io.to(reciverSocket.socketid).emit("receiveMessage", {senderId:msg.senderID,reciverId:msg.reciverID,message:msg.message,timeStamp:Date.now()});
                }
            } catch (er) {
                console.log(er);
            }

       
            try {
                const user = await User.findOne({ _id: msg.senderID }).select('contact');
                if (!user.contact.includes(msg.reciverID)) {
                    await User.findByIdAndUpdate(msg.senderID, {
                        $push: { contact: msg.reciverID }
                    });
                }
            } catch (er) {
                console.log(er.message);
            }
        });

      
        socket.on('disconnect', async () => {
            console.log(`User disconnected: ${socket.id}`);
            await User.findOneAndUpdate(
                { socketid: socket.id },
                { $set: { socketid: null } },
                { new: true }
            );
        });
    });
}

export default ChatRouter;
