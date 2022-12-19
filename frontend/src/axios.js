import axios from "axios";
const axiosInstance = axios.create({
    baseUrl: process.env.REACT_APP_API_URL
});
axiosInstance.defaults.baseURL = "http://localhost:8080/api/v1/";


export default axiosInstance;