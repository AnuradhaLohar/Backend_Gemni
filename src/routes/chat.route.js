import express from 'express'
import { createChat, deleteChats, getChats, renameChat } from '../controllers/chat.controller.js'

const chatRouter = express.Router()

chatRouter.get('/get-chats', getChats)

chatRouter.post('/create-chat', createChat)

chatRouter.put('/rename-chat', renameChat)

chatRouter.delete('/delete-chat/:chatId', deleteChats)

export default chatRouter