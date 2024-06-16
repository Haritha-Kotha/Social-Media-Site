import React, { useContext, useRef } from 'react'
import './login.css'
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/auth/AuthContext';
import {useNavigate} from 'react-router-dom'



export const Login = () => {

  const nav = useNavigate()
  const email = useRef();
  const password = useRef();
  const {user,isFetching,error,dispatch} = useContext(AuthContext)

  const handleSubmit =async(e) =>{
    e.preventDefault()
    // console.log(email.current.value);
    // console.log(password.current.value);
    await loginCall({email:email.current.value, password: password.current.value},dispatch)
    console.log(email.current.value);
    console.log(password.current.value);
  }
  console.log(user)

  return (
    <div className='login'>
      <div className="loginInfo">
        <h1 className="title">HariMedia</h1>
        <p>Login with your credintials and get connected with your friends.Share every moment with your loved ones</p>
      </div>
      <form className="loginDetails" onSubmit={handleSubmit}>
        <div className="loginInput">
          <input type="email" placeholder='' required ref={email}/>
          <label className="loginInputPlaceholder">Email</label>
        </div>
        <div className="loginInput">
          <input type="password" placeholder='' required ref={password}/>
          <label className="loginInputPlaceholder">Password</label>
        </div>
        <button className="loginBtn" disabled={isFetching}>{isFetching ? "Loading..." : "Login"}</button>
        <a href="#" className="forgotPassword">Forgot Password?</a>
        <button type='submit' className="newBtn" disabled={isFetching} onClick={()=>nav('/register')}>Create a new account</button>
      </form>
    </div>
  )
}
