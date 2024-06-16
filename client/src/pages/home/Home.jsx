import React from 'react'
import './home.css';
import { Topbar } from '../../components/topbar/Topbar';
import { Sidebar } from '../../components/sidebar/Sidebar';
import { Feed } from '../../components/feed/Feed';
import { Rightbar } from '../../components/rightbar/Rightbar';

export const Home = () => {
  return (
    <div className='home'>
      <Topbar/>
      <div className="homeContainer">
        <Sidebar/>
        <Feed/>
        <Rightbar/>
      </div>
    </div>
  )
}