import React, { useEffect, useState } from 'react'
import './profile.css'
import { Topbar } from '../../components/topbar/Topbar'
import { Sidebar } from '../../components/sidebar/Sidebar'
import { Feed } from '../../components/feed/Feed'
import { Rightbar } from '../../components/rightbar/Rightbar'
import axios from 'axios'
import { useParams } from 'react-router-dom';


export const Profile = () => {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  const {username} = useParams()
  console.log(username)

  const [user,setUser] = useState({})

  useEffect(()=>{
    const fetchUser = async() =>{
      const res = await axios.get(`/users/?username=${username}`)
      setUser(res.data)
    }
    fetchUser()
  },[username])

  return (
    <>
    <Topbar/>
    <div className="profile">
      <Sidebar/>
      <div className="profileRight">
        <div className="profileRightTop">
          <div className="profileCover">
            <img src={user.coverPic ? PF+user?.coverPic : PF+"/noAvatar.jpg"} alt="no img" className="profileCoverPic" />
            <img src={user.profilePic ? PF+user?.profilePic : PF+"/noAvatar.jpg"} alt="no img" className="profilePic" />
          </div>
          <div className="profileInfo">
            <h4 className="profileInfoName">{user?.username}</h4>
            <span className="profileInfoDesc">{user?.desc}</span>
          </div>
        </div>
        <div className="profileRightBottom">
          <Feed username={username}/>
          <Rightbar user = {user}/>
        </div>
      </div>
    </div>
    </>
  )
}
