import MessageModel from "../model/messageModel.js";

export const createMessages = async (req, res) => {
    // const message = {
    //     chatId: req.chatId,
    //     name: req.body.name
    // }

    const { text, chatId, isGeminiResponse } = req.body;

    try {
        const newMessage = await MessageModel.create({text, chatId, isGeminiResponse})

        if (!newMessage) {
           return res.status(400).json({
                status: 'error',
                message: 'Message cannot created...'
            })
        }

       return res.status(201).json({
            data: newMessage,
            status: 'success',
            message: 'New Message Created...'
        })
        
    } catch (err) {
       return res.status(400).json({
            status: 'error',
            message: err.message
        })
    }
}

export const getAllMessages = async (req, res) => {

    const { chatId } = req.params;
    try {
        const messages = await MessageModel.find({ chatId })
        if (!messages) {
           return res.status(400).json({
                status: 'error',
                messages: 'Unable to fetch new message'
            })
        }

       return res.status(200).json({
            status: 'success',
            messages: 'All Messages',
            data: messages
        })
    } catch (error) {

    }
}