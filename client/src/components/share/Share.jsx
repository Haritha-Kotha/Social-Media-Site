import React, { useContext, useRef, useState } from 'react'
import './share.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceGrinStars, faLocationDot, faPhotoFilm, faTag, faXmark } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../../context/auth/AuthContext'
import axios from 'axios'


export const Share = () => {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const desc = useRef()
    const [file,setFile] = useState(null)

    const {user} = useContext(AuthContext)
    //console.log(user)

    const handleSubmit = async(e) =>{
        e.preventDefault()
        const newPost = {
            userId : user._id,
            desc : desc.current.value, 
        }
        if(file) {
            const data = new FormData()
            const filename = Date.now() + "-" + file.name
            data.append("name",filename)
            data.append("file",file)
            newPost.img = filename
            try {
                await axios.post(`/upload`,data)
            } catch (error) {
                console.log(error)
            }
            try {
                await axios.post(`/posts`,newPost)
                window.location.reload()
            } catch (error) {
                console.log(error)
            }
        }
    }
  return (
    <div className='share'>
        <div className="shareWrapper">
            <div className="shareTop">
                <img src={user.profilePic ? PF+user?.profilePic : PF+"/noAvatar.jpg"} alt="No img" className="shareProfile" />
                <input type="text" className="shareInput" 
                placeholder={`What is in your mind ${user.username} ?`}
                ref={desc}/>
            </div>
            <hr className="shareHr" />
            {
                file && (
                    <div className="sharePostContainer">
                        <img src={URL.createObjectURL(file)} className="sharePostImg" />
                        <FontAwesomeIcon className='sharePostCancelIcon' icon={faXmark} onClick={()=>setFile(null)}/>
                    </div>
                )
            }
            <form className="shareBottom" onSubmit={handleSubmit}>
                <div className="shareOptions">
                    <label className="shareOption" htmlFor='file'>
                        <FontAwesomeIcon className='shareIcon' color='tomato' icon={faPhotoFilm}/>
                        <span className="shareOptionText" >Photo or video</span>
                        <input type="file" id='file' 
                        style={{display:"none"}} 
                        accept='.png,.jpeg,.jpg'
                        onChange={e=>setFile(e.target.files[0])}/>
                    </label>
                    <div className="shareOption">
                        <FontAwesomeIcon className='shareIcon' color='#1d9bf0' icon={faTag}/>
                        <span className="shareOptionText">Tag</span>
                    </div>
                    <div className="shareOption">
                        <FontAwesomeIcon className='shareIcon' color='green' icon={faLocationDot}/>
                        <span className="shareOptionText">Location</span>
                    </div>
                    <div className="shareOption">
                        <FontAwesomeIcon className='shareIcon' color='goldenrod' icon={faFaceGrinStars}/>
                        <span className="shareOptionText">Feelings</span>
                    </div>
                </div>
                <button className="shareBtn" type='submit'>Share</button>
            </form>
        </div>
    </div>
  )
}
