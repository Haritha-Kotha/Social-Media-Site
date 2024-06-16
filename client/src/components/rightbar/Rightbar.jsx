import React, { useContext, useEffect, useState } from 'react'
import './rightbar.css'
import { Ad } from '../ad/Ad'
import { Users } from '../../data'
import { Online } from '../online/Online'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/auth/AuthContext'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faMinus } from '@fortawesome/free-solid-svg-icons'

export const Rightbar = ({user}) => {
  const HomeRightbar =() =>{
    return(
      <>
      <div className="birthdayContainer">
        <img src="/assets/bday.jpg" className='birthdayImg' alt="no img" />
        <span className="birthdayText">
          <b>Chingu's Birthday</b> and <b>1 other</b> have Birthday today!!
        </span>
      </div>
      <Ad/>
      <h4 className="rightbarTitle">Online Friends</h4>
      <ul className="rightbarFrndList">
        {
          Users.map((user)=>(
            <Online key={user.id} user={user}/>
          ))
        }
      </ul>
      </>
    )
  }
  const ProfileRightbar =({user}) =>{

  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const nav = useNavigate()
  const {user : currentUser, dispatch} = useContext(AuthContext)
  const [friends,setFriends] = useState([])
  const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id))
  useEffect(() => {
    const getFriends =async() => {
      try {
        const res = await axios.get(`/users/friends/${user?._id}`)
        setFriends(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getFriends()
  },[user])

  useEffect(()=>{
    setFollowed(currentUser.followings.includes(user?._id))
  },[currentUser.followings,user?._id])

  const handleClick =async() =>{
    try {
      if(followed)
      {
        await axios.put(`/users/${user._id}/unfollow`,{userId : currentUser._id})
        dispatch({type : "UNFOLLOW",payload : user._id})
      }
      else
      {
        await axios.put(`/users/${user._id}/follow`,{userId : currentUser._id})
        dispatch({type : "FOLLOW",payload : user._id})
      }
      setFollowed(!followed)
    } 
    catch (error) {
      console.log(error)
    }
  }
    return(
      <>
      {
        currentUser.username !== user.username 
        ?
         (
          <button className='rightbarFollowBtn' onClick={handleClick}>
            {followed ? "unFollow" : "Follow" }
            {
             followed ? 
             <FontAwesomeIcon icon={faMinus} className='rightbarFollowIcon'/>:
             <FontAwesomeIcon icon={faAdd} className='rightbarFollowIcon'/>
            }
          </button>
         )
         :
         (
          <button className='rightbarLogoutBtn' onClick={()=>{
            dispatch({type : "LOGOUT"})
            window.location.reload()
          }}>
            Logout
          </button>
         )
      }
      <h4 className="rightbarTitle">User Information</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <div className="rightbarInfoKey">City : </div>
          <div className="rightbarInfoValue">{user?.city || "Unknown"}</div>
        </div>
        <div className="rightbarInfoItem">
          <div className="rightbarInfoKey">From : </div>
          <div className="rightbarInfoValue">{user?.from || "Unknown"}</div>
        </div>
        <div className="rightbarInfoItem">
          <div className="rightbarInfoKey">Relationship : </div>
          <div className="rightbarInfoValue">{user?.relationship === 1 
          ? "single"
          : user?.relationship === 2 
          ? "commited" 
          : "secret"}
          </div>
        </div>
      </div>
      <h4 className="rightbarTitle">User Friends</h4>
      <div className="rightbarFollowings">
        {
          friends.map((friend) => (
            <div className="rightbarFollowing" onClick={()=>nav(`/profile/${friend.username}`)} key ={friend._id}>
              <img src={friend.profilePic ? PF+friend?.profilePic : PF+"/noAvatar.jpg"} alt="no img" className='rightbarFollowingImg'/>
              <span className="rightbarFollowingName">{friend?.username}</span>
            </div>
          ))
        }     
      </div>
      <Ad/>
      </>
    )
  }
  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
      {
        user?<ProfileRightbar user={user} />:<HomeRightbar/>
      }
      </div>
    </div>
  )
}
