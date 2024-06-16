const bcrypt = require("bcrypt");

const User = require("../models/UserModel")

const registerAuth= async(req,res)=>{  
    try {
        //generating hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword =await bcrypt.hash(req.body.password,salt)
        //creating new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword
        })
        //saving into database
        const user=await newUser.save();
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

const loginAuth =async(req,res) =>{
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user)
        {
           return  res.status(404).json("User not found");
        }

        const validPassword = await bcrypt.compare(req.body.password,user.password)
        if(!validPassword )
        {
            return res.status(400).json("Invalid password");
        } 
        return res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports={registerAuth,loginAuth}