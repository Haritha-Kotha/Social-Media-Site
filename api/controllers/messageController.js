const Message = require("../models/Message");

//add msg
const addMsg =async(req,res) => {
    const newMsg = Message(req.body)
    try {
        const savedMsg = await newMsg.save()
       return res.status(200).json(savedMsg)
    } catch (error) {
       return res.status(500).json(error)
    }
}
//get msgs
const getMsgs = async(req,res) => {
    try {
        const messages = await Message.find({
            conversationId : req.params.conversationId
        })
       return res.status(200).json(messages)
    } catch (error) {
       return res.status(500).json(error)
    }
}

module.exports = {
    addMsg,
    getMsgs,
}