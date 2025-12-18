import mongoose from "mongoose";
import User from "./userModel.js";

const chatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
       type:String,
       required:true
    }

}, { timestamps: true })

const ChatModel = mongoose.model('gemini_chat', chatSchema)
export default ChatModel;