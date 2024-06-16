const Conversation = require("../models/Conversation");

//new conversation
const newConversation = async(req,res) => {
try {
    let exist = false;
    const conversations = await Conversation.find()
    conversations.map((conversation) => {
        if(conversation.members.includes(req.body.senderId) &&
         conversation.members.includes(req.body.receiverId))
         {
            exist = true
         }
    })
    if(!exist) {
        const newConversation = new Conversation({
            members : [
                req.body.senderId,
                req.body.receiverId
            ]
        })
        const savedConversation = await newConversation.save()
        return res.status(200).json(savedConversation)
    }
    else{
        return res.status(404).json("Already have")
    }
} catch (error) {
    return res.status(404).json(error)
}
}
//get conversation of user
const getConversation = async(req,res) => {
    try {
        const conversation = await Conversation.find({
           members : { $in : [req.params.userId]}
        //    members :( req.params.id !== members[0] )
        })
       return res.status(200).json(conversation)
    } catch (error) {
        return res.status(404).json(error)
    }
}

// get specific conversation
const getSpecificConversation = async(req,res) => {
    try {
        const conversation = await Conversation.findOne({
            members : {$all : [req.params.senderId, req.params.receiverId]}
        })
       return res.status(200).json(conversation)
    } catch (error) {
        return res.status(404).json(error)
    }
}

module.exports = {
    newConversation,
    getConversation,
    getSpecificConversation
}