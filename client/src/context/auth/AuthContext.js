import { createContext, useEffect, useReducer } from "react"
import { AuthReducer } from "./AuthReducer"


const INITIAL_STATE = {
    // user : {
    //     "_id": "655e16115178598146af38dc",
    //     "username": "Hari",
    //     "email": "hari@gmail.com",
    //     "profilePic": "",
    //     "coverPic": "",
    //     "followers": [],
    //     "followings": [],
    //     "isAdmin": false,
    //     "__v": 0,
    //     "desc": "Hello Chingu..."
    // },
    user:JSON.parse(localStorage.getItem("user")) || null,
    isFetching : false,
    error : false
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({children}) =>{
    const [state,dispatch] = useReducer(AuthReducer,INITIAL_STATE)
    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(state.user))
    },[state.user])
    return(
        <AuthContext.Provider value={{
            user: state.user,
            isFetching: state.isFetching,
            error:state.error,
            dispatch
        }} >
            {children}
        </AuthContext.Provider>
    )
}