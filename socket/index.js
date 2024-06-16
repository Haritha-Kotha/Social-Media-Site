const io = require("socket.io")(5000,{cors :{
    origin : "http://localhost:3000"
}})

let users = []
const addUser = (userId, socketId) => {
    !users.some((user)=> user.userId === userId) &&
    users.push({userId,socketId})
}
const removeUser = (socketId) => {
    users = users.filter((user)=>user.socketId !== socketId)
}
const getReceiver = (receiverId) =>{
    return users.find((user)=> user.userId === receiverId )
}

io.on('connection',(socket)=>{

    console.log("user connected")

    //adding users and sending users array to client
    socket.on("addUser", (userId) => {
        addUser(userId,socket.id)
        io.emit("getUsers",users)
    })

    //receiving msg from client and finding reciever and sending msg to receiver
    socket.on("sendMessage",({senderId,receiverId,text})=>{
        const user = getReceiver(receiverId)
        io.to(user.socketId).emit("getMessage",{senderId,text})
    })


    //removing users while disconnected and sending users array to client
    socket.on("disconnect", () => {
        console.log("user disconnected")

        removeUser(socket.id)
        io.emit("getUsers",users)
    })
})