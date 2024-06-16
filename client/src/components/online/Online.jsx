import React from 'react'
import './online.css'

export const Online = ({user}) => {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  return (
    <li className="rightbarFrnd">
      <div className="rightbarFrndProfileContainer">
        <img src={PF+user?.profile} alt="no img" className='rightbarFrndProfile'/>
        <div className="rightbarOnline"></div>
      </div>
      <div className="rightbarFrndUsername">
        {user?.username}
      </div>
    </li>
  )
}
