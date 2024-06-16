import { useContext, useEffect, useRef, useState } from 'react'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import Conversation from '../../components/conversations/Conversation'
import Message from '../../components/message/Message'
import { Topbar } from '../../components/topbar/Topbar'
import './messenger.css'
import { AuthContext } from '../../context/auth/AuthContext'
import axios from 'axios'
import {io} from 'socket.io-client'

function Messenger() {
    const {user} = useContext(AuthContext)
    const [conversations, setConversations] = useState([])
    const [currentChat,setCurrentChart] = useState(null)
    const [messages,setMessages] = useState([])
    
    //to keep arrival msg from socket
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])

    const newMessage = useRef()
    const scrollRef = useRef()

    //socket
    const socket = useRef()
    useEffect(()=>{
        socket.current = io("ws://localhost:5000")
        //getting msg from socket
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender : data.senderId,
                text : data.text,
                createdAt : Date.now()
            })
        })
    },[])

    //after arriving we have to update messages in db
    useEffect(() => {
        arrivalMessage && 
        currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages(prev=>[...prev,arrivalMessage])

    },[arrivalMessage,currentChat])

    // sending(emit) userid to server to add users array and getting all users
    useEffect(()=>{
        socket.current.emit("addUser", user._id)
        socket.current.on("getUsers", (users)=>{
          //  console.log(users)
          setOnlineUsers(
            user.followings.filter(friendId => users.some(user => user.userId === friendId))
          )
        })
    },[user])
    

    //useeffects server(api)
    useEffect(()=>{
        const getConversations = async() => {
            try {
                const res = await axios.get(`/conversations/${user._id}`)
                setConversations(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getConversations()
    },[user._id])

    useEffect(()=>{
        const getMessages =async() => {
            try {
                const res = await axios.get(`/messages/${currentChat._id}`)
                setMessages(res.data)
            } catch (error) {
                console.log(error)
            }   
        }
        getMessages()
    },[currentChat])

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(newMessage.current.value)
        {
            const msg = {
                sender : user._id,
                text : newMessage.current.value,
                conversationId : currentChat._id
            }
    
            const receiverId = currentChat.members.find(member=>member !== user._id)
           
            socket.current.emit("sendMessage",{senderId : user._id, receiverId, text : newMessage.current.value })
    
    
            try {
                //console.log(msg)
                const res = await axios.post(`/messages`,msg)
                setMessages([...messages,res.data])
                newMessage.current.value=""
            } catch (error) {
                console.log(error)
            }
        }
    }
   // console.log(messages)

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behaviour : "smooth"})
    },[messages])

    const handleKeydown = (e) => {
        const textarea = document.getElementById("textareaId")
        textarea.style.height = "50px"
        let scHeight = e.target.scrollHeight
        textarea.style.height = scHeight+"px"
    }

  return (
    <>
        <Topbar/>
        <div className='messenger'>
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input type="text" placeholder='Search friends' className="chatMenuInput" />
                    {
                        conversations.map((c)=>(
                            <div onClick={()=>setCurrentChart(c)} key = {c._id}>
                                {
                                <Conversation conversation = {c} currentUser = {user}/>
                                } 
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    {
                        currentChat ? 
                        <>
                            <div className="chatBoxTop">
                                {
                                    messages?.map((m) => (
                                        <div ref={scrollRef} key ={m._id}>
                                            <Message message = {m} own={m.sender === user._id}/>
                                        </div>
                                    ))
                                }
                                
                            </div>  
                            <div className="chatBoxBottom">
                                <textarea placeholder='Message'
                                className='chatMessageInput'
                                ref={newMessage}
                                onKeyDown={handleKeydown}
                                id="textareaId"/>
                                <button className='chatMessageBtn' onClick={handleSubmit} >Send</button>
                            </div>
                        </>
                        :
                        <span className='noConversationText'>Open conversation to start chat</span>
                    }            
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <ChatOnline onlineUsers = {onlineUsers}
                     currentUser={user._id}
                     setCurrentChart={setCurrentChart}/>
                </div>
            </div>
        </div>
    </>
    
  )
}

export default Messenger