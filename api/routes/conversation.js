const router = require("express").Router()
const { newConversation, getConversation, getSpecificConversation } = require("../controllers/conversationController")
const Conversations = require("../models/Conversation")

//new Conversation
router.post('/',newConversation)
//get conversation of user
router.get("/:userId",getConversation)
// get specific conversation
router.get('/find/:senderId/:receiverId',getSpecificConversation)

module.exports = router