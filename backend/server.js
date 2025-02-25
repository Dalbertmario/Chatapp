import express from 'express'
import { Server } from 'socket.io'
import http from 'http'
import cors from 'cors'
import connectDb from './src/config/mongoose.js'
import dotenv from 'dotenv'
import userSearchRouter from  './src/router/userSearchRouter.js'
import HandeUserRouter from  './src/router/handeUserRouter.js'
import ChatRouter from './src/router/ChatRouter.js'
import ContactRouter  from  './src/router/ContactRouter.js'
import requestRouter from './src/router/requset.js'
import oauthRouter from './src/router/oauth.js'

const app = express()
app.use(express.json())
dotenv.config()
app.use(cors({ 
    origin: '*', 
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'}))
const server = http.createServer(app)
const port = 3000

const io = new Server(server,{
    cors:{
        origin:'*',
    }
})
//Db Connection
connectDb()

app.get('/',(req,res)=>{
    res.send('heelo')
})
ChatRouter(io)
app.use('/searching',userSearchRouter)
app.use('/authorization',HandeUserRouter)
app.use('/account',ContactRouter)
app.use('/oauth',oauthRouter)
app.use('/request',requestRouter)


server.listen(port,()=>{
    console.log('http://localhost:3000')
})