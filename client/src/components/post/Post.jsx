import React, { useContext, useEffect, useState } from 'react'
import './post.css'
// import { Users } from '../../data'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEllipsisVertical,faThumbsUp,faHeart} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import {format} from 'timeago.js'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../context/auth/AuthContext'

export const Post = ({post}) => {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const [user, setUser] = useState({})
    const [like,setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const {user : currentUser} = useContext(AuthContext)
    const [hideOption, setHideOption] = useState(false)
 
    const likeHandler =async()=>{
        try {
            await axios.put(`/posts/${post._id}/like`,{userId:currentUser._id})
        } catch (error) {
            console.log(error)
        }
        setLike(isLiked?like-1:like+1)
        setIsLiked(!isLiked)
    }

    useEffect(()=>{
        setIsLiked(post.likes.includes(currentUser._id))
    },[post.likes,currentUser._id])

    useEffect(()=>{
        const fetchUser = async() =>{
            const res = await axios.get(`/users/?userId=${post.userId}`)
            setUser(res.data)
            // console.log(user)
            // console.log(user.username)
        }
        fetchUser()
    },[post.userId])

    const handleDelete = async() =>{
        try {
            await axios.delete(`/posts/${post._id}/${currentUser._id}`);
            window.location.reload() 
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='post'>
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to = {`/profile/${user.username}`} >
                        <img className='postProfile' src={user.profilePic ? PF+user?.profilePic : PF+"/noAvatar.jpg"}/>
                    </Link>
                    <div className="postUsername">{user?.username}</div>
                    <div className="postTime">{format(post.createdAt)}</div>
                </div>
                <div className="postTopRight">
                    <FontAwesomeIcon className='postIcon' 
                    icon={faEllipsisVertical} 
                    onClick={()=>setHideOption(!hideOption)}/>
                    {
                        hideOption && 
                        <ul className="postTopRightOption">
                            <li>details</li>
                            <li>share</li>
                            <li>hide</li>
                            {currentUser._id === post.userId && 
                            <li id="deletePostOption" onClick={handleDelete}>delete</li>
                            }
                        </ul>
                    }
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post?.desc}</span>
                <img className='postImg' src={PF+post?.img} alt="No img" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <FontAwesomeIcon className={isLiked?"postLikeIcon liked":"postLikeIcon"} onClick={likeHandler} icon={faThumbsUp}/>
                    <FontAwesomeIcon  className={isLiked?"postLikeIcon loved":"postLikeIcon"} onClick={likeHandler} icon={faHeart}/>
                    <span className="postLikedCount">{like} people liked</span>

                </div>
                <div className="postBottomRight">
                    <div className="postCommentText">{post?.comment || "No"} comments</div>
                </div>
            </div>
        </div>
    </div>
  )
}
