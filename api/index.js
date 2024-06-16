//imports
const express = require('express');
const mongoose = require("mongoose");
const helmet = require("helmet");
const dotenv = require("dotenv")
const multer = require("multer")
const path = require("path")

const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const conversationRoute = require("./routes/conversation")
const messageRoute = require("./routes/message")


//initialisation
const app = express();
dotenv.config();

//database connection
mongoose.connect(process.env.MONGOURL).
then(()=>console.log("Database Connected")).
catch((err)=>console.log("Database not connected:",err))


//middlewares
app.use("/images",express.static(path.join(__dirname,"public/images")))
app.use(express.json());
app.use(helmet());

const storage = multer.diskStorage({
    destination : (req,file,cb) =>
    {
        cb(null,"public/images")
    },
    filename : (req,file,cb) =>
    {
        cb(null,req.body.name)
    }
})
const upload = multer({storage})
app.post("/api/upload",upload.single("file"),async(req,res) => {
    try {
        return res.status(200).json("Uploaded successfully")
    } catch (error) {
        console.log(error)
    }
})
//routes
app.use("/api/users",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/posts",postRoute)
app.use("/api/conversations",conversationRoute)
app.use("/api/messages",messageRoute)


//listening to port
app.listen(8080,()=>{
    console.log("Backend server is running")
})