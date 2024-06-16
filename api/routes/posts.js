const { createPost, updatePost, deletePost, likedPost, getPost, timelinePosts, getUserPosts } = require("../controllers/postController")

const router = require("express").Router()

//create a post
router.post('/',createPost)
//update a post
router.put("/:id",updatePost)
//delete a post
router.delete("/:postId/:userId",deletePost)
//like a post
router.put("/:id/like",likedPost)
//get a post
router.get("/:id",getPost)
//get timeline posts
router.get("/timeline/:userId",timelinePosts)
//get user posts
router.get("/profile/:username",getUserPosts)


module.exports = router