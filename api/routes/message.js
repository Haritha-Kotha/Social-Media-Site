const router = require("express").Router()
const { addMsg, getMsgs } = require("../controllers/messageController")
const Message = require("../models/Message")

//add msg
router.post('/',addMsg)

//get msgs
router.get("/:conversationId",getMsgs)

module.exports = router