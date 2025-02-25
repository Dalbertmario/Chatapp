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
        console.log(msg)
        try{
        const newReciverId = await User.findOne({_id:msg.reciverID}).select('contact')
      
        if (newReciverId && !newReciverId.contact.includes(msg.senderID)) {
             newReciverId.contact.push(msg.senderID)
        }}catch(er){
            console.log(er.message)
        }
        
            try {
                const newMsg = new Message({
                    reciverId: msg.reciverID,
                    senderId: msg.senderID,
                    message: msg.message,
                });
                await newMsg.save();
                const reciverSocket = await User.findOne({ _id: msg.reciverID }).select('socketid');
                if (reciverSocket.socketid) {
                    io.to(reciverSocket.socketid).emit("receiveMessage", {senderId:msg.senderID,reciverId:msg.reciverID,message:msg.message,timeStamp:Date.now()});
                }
            } catch (er) {
                console.log(er);
            }

       
            try {
                const users = await User.findOne({ _id: msg.senderID }).select('contact');
                if (users && !users.contact.includes(msg.reciverID)) {
                     users.contact.push(msg.reciverID)
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
