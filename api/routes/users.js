const router = require('express').Router()

//importing controllers
const { updateUser, deleteUser, getUser, followUser, unfollowUser, getFriends } = require('../controllers/userController')

//routes

//update
router.put("/:id",updateUser)
//delete
router.delete("/:id",deleteUser)
//get a user
router.get('/',getUser)
//follow 
router.put("/:id/follow",followUser)
//unfollow
router.put("/:id/unfollow",unfollowUser)
//get friends
router.get("/friends/:userId",getFriends)

//exporting
module.exports=router