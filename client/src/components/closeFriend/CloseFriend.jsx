import React from 'react'
import './closeFriend.css'

export const CloseFriend = ({user}) => {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER

  return (
    <li className="sidebarFriend">
            <img src={PF+user?.profile} alt="no img" className='sidebarFriendImg'/>
            <div className="sidebarFriendName">{user?.username}</div>
    </li>
  )
}
