import React, { useContext, useEffect, useState } from 'react'
import './feed.css'
import { Share } from '../share/Share'
//import { Posts } from '../../data'
import { Post } from '../post/Post'
import axios from 'axios';
import { AuthContext } from '../../context/auth/AuthContext';

export const Feed = ({username}) => {
  
  const [posts, setPosts] = useState([])
  const {user,isFetching} = useContext(AuthContext)

  useEffect(()=>{
    const fetchPosts = async() => {
      const res = username 
      ? await axios.get(`/posts/profile/${username}`)
      : await axios.get(`/posts/timeline/${user._id}`)
      
      setPosts(res.data.sort((post1,post2)=>
        {
          return new Date(post2.createdAt) - new Date(post1.createdAt)
        }
      ))
    }
    fetchPosts()
  },[username,user._id])

  return (
    <div className='feed'>
      <div className="feedWrapper">
       {((user.username === username) || (!username)) &&  <Share/> }
        {
         isFetching ? "Loading..." : posts?.map(post=>(
            <Post key={post._id} post={post}/>
          ))
        }
      </div>
    </div>
  )
}
