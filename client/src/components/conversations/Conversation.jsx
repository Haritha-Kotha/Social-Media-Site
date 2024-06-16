import { useEffect, useState } from 'react'
import './conversation.css'
import axios from 'axios'

export default function Conversation({conversation,currentUser}) {
 
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  const [user,setUser] = useState(null)



  useEffect(()=>{
    const friendId = conversation.members.find(m=>m !== currentUser._id)

    const getUserFriends = async() =>{
      try {
        const res = await axios.get(`/users/?userId=${friendId}`)
        //console.log(res.data)
        setUser(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getUserFriends()
  },[currentUser,conversation])
  return (
    <div className='conversation'>
        <img src={user?.profilePic ? PF+user.profilePic : PF+"/noAvatar.jpg"}
          className="conversationImg" />
        <span className="conversationName">{user?.username}</span>
    </div>
  )
}
