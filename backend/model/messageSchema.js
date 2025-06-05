import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    avatar:String,
    sender:String,
    message:String,
    timeStamp:{type:Date,default :Date.now},
    time:String
})

export const Message = mongoose.model("Message",messageSchema)