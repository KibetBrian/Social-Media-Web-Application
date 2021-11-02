import React, { useRef, useState } from 'react'
import './resetPassword.scss'
import axios from 'axios'

function ResetPassword() {

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordNotMatch, setPasswordNotMatch] = useState(false);
    const input1 = useRef();
    const input2 = useRef();
    const url = window.location.pathname;
    const axiosInstance = axios.create(
        {
            baseUrl: process.env.REACT_APP_API_URL
        }
    )
    

    const handleFormSubmit = async (e)=>
    {
        console.log(newPassword === confirmPassword , newPassword !== '' )
        e.preventDefault();
        
        if (newPassword === confirmPassword && newPassword !== '' )
        {
            const postUserData = await axiosInstance.post(url, {newPassword});
        }
        else 
        {
            setPasswordNotMatch(true);
            input1.current.setCustomValidity ("Passwords Doesn't match");
            input2.current.setCustomValidity("Passwords doesn't match");
        }
    }

    return (
        <div className='resetPassword'>
            <form onSubmit={(e)=>e.preventDefault}>
                <label  htmlFor="newPassword">New Password</label>
                <input onChange={(e)=>setNewPassword(e.target.value)} ref = {input1} required name = 'newPassword' type="text" />
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input onChange={(e)=>setConfirmPassword(e.target.value)} ref ={input2} required type="text" />
                <button onClick={handleFormSubmit} type = "submit">Reset</button>
            </form>
        </div>
    )
}

export default ResetPassword
