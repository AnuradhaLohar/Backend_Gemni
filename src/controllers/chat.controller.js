import ChatModel from "../model/chatsModel.js";
import MessageModel from "../model/messageModel.js"


export const getChats = async (req, res) => {

  const userId = req.userId
  try {
    const chats = await ChatModel.find({ userId })

    return res.status(200).json({
      data: chats,
      message: 'OK',
      status: 'success'
    })
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({
      status: 'error',
      message: err.message
    })

  }
}

export const createChat = async (req, res) => {

  const chat = {
    userId: req.userId,
    name: req.body.name || "New Chat"
  }

  try {

    const newChat = await ChatModel.create(chat)

    if (!newChat) {

      return res.status(400).json({
        status: 'error',
        message: 'chat cannot created...'
      })
    }

    return res.status(201).json({
      data: newChat,
      status: 'success',
      message: 'New Chat Created...'
    })


  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: err.message
    })
  }
}

export const renameChat = async (req, res) => {
  const { id, name } = req.body

  if (!id || !name) {
    return res.status(400).json({
      status: 'error',
      message: 'id and name are required'
    })
  }

  try {

    const updatedChat = await ChatModel.findByIdAndUpdate(id, { name }, { new: true })

    if (!updatedChat) {

      return res.status(400).json({
        status: 'error',
        message: 'chat cannot updated...'
      })
    }

    return res.status(201).json({
      data: updatedChat,
      status: 'success',
      message: 'Chat updated...'
    })


  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: err.message
    })
  }
}

export const deleteChats = async (req, res) => {

  const { chatId } = req.params;

  try {
    const isChatDelete = await ChatModel.deleteOne({ _id: chatId, userId: req.userId })

    if (!isChatDelete) {
      res.status(400).json({
        status: 'error',
        message: 'chat cannot be Deleted...'
      })
    }

    const isMessagesDeleted = await MessageModel.deleteMany({ chatId })

    if (!isMessagesDeleted) {
      return res.status(400).json({
        status: 'error',
        message: 'Unable to delete messages from the chat!'
      })
    }

    return res.status(200).json({
      status: 'success',
      message: 'Chat deleted sccuessfully...',
      data: { 
        chatId :chatId
      }
    })

  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: error.message
    })
  }
}