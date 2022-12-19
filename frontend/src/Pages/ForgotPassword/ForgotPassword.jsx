import React from 'react'
import axios from 'axios'
import './forgotPassword.scss'
import { useState } from 'react'

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [resData, setResData] = useState(null);

    const handleFormSubmit = async (e)=>
    {
        e.preventDefault();
        const sendEmail =  await axios.post('/forgot-password', {email});
        setResData(sendEmail.data);
    }
    console.log(resData) 
    return (
        <div className='forgotPassword'>
            <div className="forgotPasswordWrapper">
                <div className="left">
                    <div className="circle"></div>
                    <img src="/assets/forgotpasswordillustration.svg" alt="" />
                </div>
                <div className="right">
                    <h1>Forgot Password ?</h1>
                    <p>Enter the email associated with your account</p>
                    <form onSubmit={handleFormSubmit}>
                        <input placeholder='Enter email address' required onChange={(e)=>setEmail(e.target.value)} name='email' type="email" />
                        <button type = "submit">Next</button>
                    </form> 
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword

