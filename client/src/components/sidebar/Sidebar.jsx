import React from 'react'
import './sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faDashboard, faFeed, faMessage, faQuestion, faSuitcase, faUserGroup, faVideo } from '@fortawesome/free-solid-svg-icons'
import { Users } from '../../data'
import { CloseFriend } from '../closeFriend/CloseFriend'

export const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <FontAwesomeIcon icon={faFeed} className='sidebarIcon'/>
            <div className="sidebarListItemText">Feed</div>
          </li>
          <li className="sidebarListItem">
            <FontAwesomeIcon icon={faMessage} className='sidebarIcon'/>
            <div className="sidebarListItemText">Charts</div>
          </li>
          <li className="sidebarListItem">
            <FontAwesomeIcon icon={faVideo} className='sidebarIcon'/>
            <div className="sidebarListItemText">Videos</div>
          </li>
          <li className="sidebarListItem">
            <FontAwesomeIcon icon={faUserGroup} className='sidebarIcon'/>
            <div className="sidebarListItemText">Groups</div>
          </li>
          <li className="sidebarListItem">
            <FontAwesomeIcon icon={faBookmark} className='sidebarIcon'/>
            <div className="sidebarListItemText">Bookmarks</div>
          </li>
          <li className="sidebarListItem">
            <FontAwesomeIcon icon={faQuestion} className='sidebarIcon'/>
            <div className="sidebarListItemText">Questions</div>
          </li>
          <li className="sidebarListItem">
            <FontAwesomeIcon icon={faSuitcase} className='sidebarIcon'/>
            <div className="sidebarListItemText">Jobs</div>
          </li>
          <li className="sidebarListItem">
            <FontAwesomeIcon icon={faDashboard} className='sidebarIcon'/>
            <div className="sidebarListItemText">Profile</div>
          </li>
        </ul>
        <button className="sidebarBtn">See More</button>
        <hr className='sidebarHr' />
        <ul className="sidebarFriendList">
          {
            Users?.map((user)=>(
              <CloseFriend user={user} key={user.id}/>
            ))
          }
        </ul>
      </div>
    </div>
  )
}
