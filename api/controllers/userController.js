const User = require("../models/UserModel")
const bcrypt = require("bcrypt")

//updating
const updateUser= async(req, res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password)
        {
            try {
                const salt=await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password,salt)
            }
            catch(error){
                return res.status(500).json(error)
            }
        }
        try{
          const user = await User.findByIdAndUpdate(req.params.id,{ $set : req.body})
          return res.status(200).json("Updated successfully")
        }
        catch(error){
            return res.status(404).json(error)
        }

    }
    else{
        return res.status(500).json("u can only update your account")
    }
}

//deleting a user
const deleteUser= async(req, res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try{
          const user = await User.findByIdAndDelete(req.params.id)
          return res.status(200).json("Deleted successfully")
        }
        catch(error){
            return res.status(404).json(error)
        }
    }
    else{
        return res.status(500).json("u can only delete your account")
    }
}
//getting a user
const getUser = async(req,res) =>{
    const userId = req.query.userId
    const username = req.query.username
    try {
         const user = userId ? await User.findById(userId) : await User.findOne({username}) ;
         const {password, updatedAt,createdAt,...others} = user._doc
        return res.status(200).json(others)

    } catch (error) {
        return res.status(504).json(error)
    }
}
//follow user
const followUser =async(req,res) =>{
    if(req.params.id !== req.body.userId)
    {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId)
            if(!user.followers.includes(req.body.userId) )// Y its can't identifying when u put currentUser in place of userId //&& !currentUser.followings.includes(req.params.id)
            {
                await user.updateOne({$push : {followers:req.body.userId}});
                await currentUser.updateOne({$push : {followings: req.params.id}});
                return res.status(200).json("Hurrey! u are following yaar congrats...");
            }
            else{
                return res.status(403).json("You r already following yaar... all the best!")
            }
        } catch (error) {
            return res.status(403).json(error)
        }
    }
    else{
       return res.status(404).json("You can't follow yourself dear...")
    }
}
//unfollowing user
const unfollowUser =async(req,res) =>{
    if(req.params.id !== req.body.userId)
    {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId)
            if(user.followers.includes(req.body.userId) )
            {
                await user.updateOne({$pull : {followers:req.body.userId}});
                await currentUser.updateOne({$pull : {followings: req.params.id}});
                return res.status(200).json("So sad dear! u r unfollowed now..");
            }
            else{
                return res.status(403).json("You are not following to unfollow haha!")
            }
        } catch (error) {
            return res.status(403).json(error)
        }
    }
    else{
       return res.status(404).json("You can't unfollow yourself dear...")
    }
}
//get friends
const getFriends = async(req,res) =>{
    try {
        const user = await User.findById(req.params.userId)
        const friends =  await Promise.all(
            user.followings.map((friendId) => {
                return User.findById(friendId)
            })
        )
        let friendList = []
        friends.map((friend) => {
            const {_id,username,profilePic} = friend
            friendList.push({_id,username,profilePic})
        })
        return res.status(200).json(friendList)
    } catch (error) {
        return res.status(500).json(error)
    }
}
module.exports={
    updateUser,
    deleteUser,
    getUser,
    followUser,
    unfollowUser,
    getFriends
}