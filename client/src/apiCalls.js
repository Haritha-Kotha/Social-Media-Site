import axios from 'axios'

export const loginCall = async(userCredintials, dispatch) =>{
    dispatch({type : "LOGIN_START"})
    try {
        const res = await axios.post(`/auth/login`,userCredintials)
        console.log("hi")
        dispatch({type : "LOGIN_SUCCESS", payload : res.data})
    } catch (error) {
        dispatch({type : "LOGIN_FAILURE", payload : error})
    }
}