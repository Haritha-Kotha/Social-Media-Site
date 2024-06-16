import React, { useContext, useRef } from 'react'
import './register.css'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../context/auth/AuthContext'

export const Register = () => {
  const nav = useNavigate()

  const username = useRef()
  const email = useRef()
  const password = useRef()
  const confirmPassword = useRef()

  const {isFetching} = useContext(AuthContext)

  const handleSubmit = async(e) =>{
    e.preventDefault();
    if(password.current.value !== confirmPassword.current.value)
    {
      confirmPassword.current.setCustomValidity("Oops! Password didn't matched...")
    }
    else{
      const userCredintials = {
        username : username.current.value,
        email : email.current.value,
        password : password.current.value
      }
      try {
        await axios.post(`/auth/register`, userCredintials)
        nav('/login')
      } catch (error) {
        console.log(error)
      }
    }

  }
  return (
    <div className='register'>
      <div className="registerInfo">
        <h1 className="title">HariMedia</h1>
        <p>Register with your credintials and get connected with your friends.Share every moment with your loved ones</p>
      </div>
      <form className="registerDetails" onSubmit ={handleSubmit}>
        <div className="registerInput">
          <input type="text" placeholder='' required ref={username}/>
          <label className="registerInputPlaceholder">Username</label>
        </div>
        <div className="registerInput">
          <input type="email" placeholder='' required ref={email}/>
          <label className="registerInputPlaceholder">Email</label>
        </div>
        <div className="registerInput">
          <input type="password" placeholder='' required ref={password}/>
          <label className="registerInputPlaceholder">Password</label>
        </div>
        <div className="registerInput">
          <input type="password" placeholder='' required ref={confirmPassword}/>
          <label className="registerInputPlaceholder">Confirm Password</label>
        </div>
        <button type='submit' className="registerBtn" >Sign Up</button>
        <a href="#" className="alreadyHaveAccount">Already have an account?</a>
        <button  className="newBtn" onClick={()=>nav('/login')}>Login to your account</button>
      </form>
    </div>
  )
}

