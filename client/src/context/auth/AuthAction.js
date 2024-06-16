export const LoginStart =(userCredintials) => (
    {
        type : "LOGIN_START",
    }
)

export const LoginSccess =(user) => (
    {
        type : "LOGIN_SUCCESS",
        payload : user
    }
)

export const LoginFailure =(error) => (
    {
        type : "LOGIN_FAILURE",
        payload : error
    }
)

export const Follow =(userId) => (
    {
        type : "FOLLOW",
        payload : userId
    }
)

export const UnFollow =(userId) => (
    {
        type : "UNFOLLOW",
        payload : userId
    }
)

export const Logout =(userCredintials) => (
    {
        type : "LOGOUT"  
    }
)