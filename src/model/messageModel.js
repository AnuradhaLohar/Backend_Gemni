import mongoose from "mongoose";
import ChatModel from "./chatsModel.js";

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    chatId: {
        type:String,
        required:true
    },
    isGeminiResponse: {
        type:Boolean,
        required: true,
        default:false
    }

}, { timestamps: true })

const MessageModel = mongoose.model('gemini_message', messageSchema)
export default MessageModel;