const Post = require("../models/PostModel");
const User = require("../models/UserModel");

//creating post
const createPost = async(req,res) =>{
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save();
        return res.status(200).json("Post created successfully");
    } catch (error) {
       return res.status(504).json(error)
    }
}
//updating post
const updatePost =async(req,res) =>{
    try {
        const post = await Post.findById(req.params.id)
        if(post.userId === req.body.userId){
            await post.updateOne({ $set : req.body});
            return res.status(200).json("Post updated Successfully yaar...");
        }
        else{
            return res.status(400).json("u can only update your post")
        }
    } catch (error) {
        return res.status(404).json(error)
    }
}
//deleting a post
const deletePost =async(req,res) =>{
    try {
        const post = await Post.findById(req.params.postId)
        if(post.userId === req.params.userId){
            await post.deleteOne();
            return res.status(200).json("Post deleted Successfully yaar...don't worry!");
        }
        else{
            return res.status(400).json("heyyy!! u can only delete your post")
        }
    } catch (error) {
        return res.status(404).json(error)
    }
}
//liking a post
const likedPost = async(req,res) =>{
    try {
        const post =await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId))
        {
            await post.updateOne({$push : {likes : req.body.userId}});
            return res.status(200).json("Liked post successfully");
        }
        else{
            //unliking post
            await post.updateOne({$pull : {likes: req.body.userId}});
            return res.status(200).json("Unliked post successfully");
        }
    } catch (error) {
       return res.status(404).json(error)
    }
}
//getting a post
const getPost =async(req,res) =>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post)
        {
            return res.status(404).json("Post not found");
        }

        return res.status(200).json(post);

    } catch (error) {
       return res.status(504).json(error)
    }
}
//getting timeline posts
const timelinePosts = async(req,res) =>{
    try {
       // const currentUser = await User.findById(req.body.userId);
       const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({userId: currentUser._id});
        const friendsPosts = await Promise.all(
            currentUser.followings.map((friendId)=>{
                return Post.find({userId : friendId});
            })
        );
        return res.status(200).json(userPosts.concat(...friendsPosts));
    } catch (error) {
       return res.status(404).json(error);
    }
}
//getting user posts
const getUserPosts = async(req,res) =>{
    try {
        const user = await User.findOne({username : req.params.username})
        const userPosts = await Post.find({userId : user._id})
        return res.status(200).json(userPosts)
    } catch (error) {
       return res.status(404).json(error);
    }
}

module.exports={
    createPost,
    updatePost,
    deletePost,
    likedPost,
    getPost,
    timelinePosts,
    getUserPosts
}