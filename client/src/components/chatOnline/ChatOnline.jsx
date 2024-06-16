import { useEffect, useState } from 'react'
import './chatOnline.css'
import axios from 'axios'

export default function ChatOnline({onlineUsers,currentUser,setCurrentChart}) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  const [friends, setFriends] = useState([])
  const [onlineFriends, setOnlineFriends] = useState([])

  useEffect(()=>{
    const getFriends = async() => {
      try {
        const res = await axios.get(`/users/friends/${currentUser}`)
        setFriends(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getFriends()
  },[currentUser])
  //console.log(friends)

  useEffect(()=>{
    setOnlineFriends(friends.filter(friend=>onlineUsers.includes(friend._id)))
  },[friends,onlineUsers])

  const handleClick =async (onlineFriend) => {
    try {
      const res = await axios.get(`/conversations/find/${currentUser}/${onlineFriend._id}`)
      setCurrentChart(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='chatOnline'>
        {
          onlineFriends.map(onlineFriend => (
            <div className="chatOnlineFriend" key ={onlineFriend._id} onClick={()=>handleClick(onlineFriend)}>
              <div className="chatOnlineImgContainer">
                  <img src={onlineFriend?.profilePic ? PF+onlineFriend?.profilePic : PF+"/noAvatar.jpg"}
                  className="chatOnlineImg" />
                  <div className="chatOnlineImgBadge"></div>
              </div>
              <span className="chatOnlineName">{onlineFriend?.username}</span>
           </div>
          ))
        }
    </div>
  )
}
