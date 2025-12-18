import express from 'express'
import { createMessages, getAllMessages } from '../controllers/messages.contoller.js'

const messagesRouter = express.Router()

messagesRouter.post('/create-message', createMessages)

messagesRouter.get('/get-all-messages/:chatId', getAllMessages)
export default messagesRouter