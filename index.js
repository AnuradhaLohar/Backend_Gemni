// const express = require('express')
import express from 'express'

// const bodyParser = require('body-parser')
import bodyparser from 'body-parser'
import 'dotenv/config'
import dbConnect from './src/config/dbconnect.js';
import verifyUser from './src/middlewares/auth.middleware.js';
import authRouter from './src/routes/auth.route.js';
import chatRouter from './src/routes/chat.route.js';
import messagesRouter from './src/routes/messages.route.js';
import cors from 'cors'

const app = express()

app.use(cors())
// app.use(cors({
//   // origin: "http://localhost:5173",
//   origin: "https://frontend-gemini-eight.vercel.app",
//   credentials : true
// }))

app.use(express.json())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded())


// app.use(bodyparser.urlencoded({ extended: true }));
dbConnect()


//Authentication
app.use('/api/v1/auth', authRouter)
//chats
app.use(verifyUser)
app.use('/api/v1/chat', chatRouter)
//messages
app.use('/api/v1/message', messagesRouter)

export default app

// const port = process.env.PORT;
// app.listen(port, () => {
//   console.log("Server started on port" + port)
// })


