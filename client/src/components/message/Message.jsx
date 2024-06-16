import { useEffect, useState } from 'react'
import './message.css'
import {format} from 'timeago.js'
import axios from 'axios'

export default function Message({message,own}) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  //console.log(message.sender)
  const [userSender, setUserSender] = useState(null)
  useEffect(()=>{
      const getSender = async() => {
        try {
          const res = await axios.get(`/users/?userId=${message.sender}`)
          setUserSender(res.data)
        } catch (error) {
          console.log(error)
        }
      }
      getSender()
  },[message.sender])
  return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
            <img src={PF+userSender?.profilePic ? PF+userSender?.profilePic : PF+"/noAvatar.jpg"}
             className="messageImg" />
            <p className="messageText">{message?.text}</p>
        </div>
        <div className="messageBottom">{format(message?.createdAt)}</div>
    </div>
  )
}
