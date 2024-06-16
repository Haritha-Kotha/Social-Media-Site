import React, { useContext } from 'react'
import './topbar.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBell, faHome, faMessage, faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import { useNavigate} from 'react-router-dom' 
import { AuthContext } from '../../context/auth/AuthContext'

export const Topbar = () => {
    const navigate = useNavigate()
    const {user} = useContext(AuthContext)

    const PF = process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <div className='topbar'>
        <div className="topbarLeft">
            <FontAwesomeIcon onClick={()=>navigate('/')} className='logo' icon={faHome}/>
            <div onClick={()=>navigate('/')} className="logoTitle">HariMedia</div>
        </div>
        <div className="topbarCenter">
            <div className="searchInput">
                <input type="text" className="searchbar"placeholder='Search' />
                <FontAwesomeIcon className='searchIcon' icon={faSearch}/>
            </div>
        </div>
        <div className="topbarRight">
            <div className="topbarLinks">
                <div className="topbarLink" onClick={()=>navigate('/')}>HomePage</div>
                <div className="topbarLink">TimeLine</div>
            </div>
            <div className="topbarIcons">
                <div className="topbarIconItem">
                    <FontAwesomeIcon className='topbarIcon' icon={faUser}/>
                    <div className="topbarIconBadge">3</div>
                </div>
                <div className="topbarIconItem" onClick={()=>navigate(`/messenger`)}>
                    <FontAwesomeIcon className='topbarIcon' icon={faMessage}/>
                    <div className="topbarIconBadge">5</div>
                </div>
                <div className="topbarIconItem">
                    <FontAwesomeIcon className='topbarIcon' icon={faBell}/>
                    <div className="topbarIconBadge">1</div>
                </div>
                <div className="topbarProfile" onClick={()=>navigate(`/profile/${user.username}`)}>
                   <img src={user.profilePic ? PF+user?.profilePic : PF+"noAvatar.jpg"}/>
                </div>
            </div>
        </div>
    </div>
  )
}
