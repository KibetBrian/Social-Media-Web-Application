import axios  from "axios";
const axiosInstance = axios.create(
    {
        baseUrl: process.env.REACT_APP_API_URL
    }
)

export const loginCall = async (userCredentials, dispatch) => 
{
    dispatch({type: "LOGIN_START"});
    try 
    {
        const res = await axiosInstance.post('auth/login', userCredentials);
        dispatch({type: "LOGIN_SUCCESS", payload: res.data})
        console.log(res.data)
        localStorage.setItem('user', JSON.stringify(res.data)); 
    }
    catch(err)
    {
        dispatch({type: "LOGIN_FAILURE", payload: err})
    }
}

export const registrationCall = async (traderCredentials, dispatch) =>
{
    dispatch ({type: "REGISTRATION_START)"})

    try 
    {
        const res = await axiosInstance.post ('auth/register', traderCredentials);
        dispatch({type: "REGISTRATION_SUCCESS", payload: res.data})

    }
    catch (err)
    {
        dispatch ({type: "REGISTRATION_FAILED", payload: err})
    }
}

 