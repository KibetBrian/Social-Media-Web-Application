import  axios from 'axios';
export const axiosInstance = axios.create(
    {
        baseURL: "https://tradisfin.herokuapp.com/api"
    }
)