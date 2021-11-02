
export const LoginStart = (userCredentials)=>({
    type: "LOGIN_START", 
})

export const LoginSuccess = (user)=>({
    type: "LOGIN_SUCCESS",
    payload: user
});
export const Registration = (traderCredentials)=>(
    {
        type: "REGISTRATION_START"
    }
)
export const RegistrationSuccess = (user)=>
(
    {
        type: "REGISTRATION_SUCCESS",
        payload: user
    }
)
export const RegistrationFailure = (err)=>
(
    {
        type: "REGISTRATION_FAILURE",
        payload: err
    }
)
export const LoginFailure = (err)=>({
    type: "LOGIN_FAILURE",
    payload: err
})

export const logout = ()=>
(
    {
        type: "LOG_OUT",
    }
);

export const follow = (userId)=>
(
    {
        type: "FOLLOW",
        payload: userId
    }
)
export const unfollow = (userId)=>
(
    {
        type: "UNFOLLOW",
        payload: userId
    }
)
