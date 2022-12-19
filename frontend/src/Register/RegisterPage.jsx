import React, { useRef, useState} from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom'
import './register.scss'

function RegisterPage() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confirmedPassword = useRef();
    const history = useHistory(); 
    const [error, setError] = useState(false);
    const [userNameTaken, setUserNameTaken] = useState(false);
    const axiosInstance = axios.create(
        {
            baseUrl: process.env.REACT_APP_API_URL
        }
    )
    


    const handleClick = async (e)=>
    {
        e.preventDefault();

        if ( password.current.value !== confirmedPassword.current.value)
        {
            password.current.setCustomValidity("Password doesn't match");
        }
        else
        {
             const user =
             {
                 username: username.current.value,
                 email: email.current.value,
                 password: password.current.value
             }  

             const userNameInput = async ()=>
                {
                    try
                    {
                        const checkIfUsernameIsTaken =  await axios.get('/auth/register/usernametaken', {username: username.current.value});
                        if (checkIfUsernameIsTaken.data)
                        {
                            setUserNameTaken(checkIfUsernameIsTaken)
                        }
                        else
                        {
                            setUserNameTaken(!checkIfUsernameIsTaken)
                        }
                    }
                    catch(err)
                    {
                        console.log(err)
                    }
                }
             userNameInput();
                
             try
             {
                 await axiosInstance.post("/auth/register", user)
                 history.push("/login")
             }
             catch(err)
             {
                console.log(err)
                setError(true)
             }
        }
    }
    return (
        <div className = "registerPage">
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo"> TradisFin </h3>
                    <p className="registerIntroduction">Connect with other traders around the world</p>
                </div>
                <form className="registerRight" onSubmit = {handleClick}>
                    {userNameTaken && (<span> Username taken</span>)}
                    <input type="text" required placeholder = "Enter your username" className="registerInput" ref = {username}/>
                    <input type="email" required placeholder = "Enter your email" className="registerInput" ref = {email}/>
                    <input type="password" required placeholder = "Enter your password" className="registerInput" ref = {password} />
                    <input type="password" required placeholder = "Confirm your password" className="registerInput" ref = {confirmedPassword}/>
                    <button type = "submit" className="registerButton">Sign Up</button>
                    {error && ( <span className="invalidCredentialsSpan">Check the credentials and try again</span>)}
                    <span className="alreadyHaveAnAccountText">Already have an account ?</span>
                    <Link to = '/login' style = {{textDecoration: 'none', display: 'flex'}}>
                    <button type = "submit" style = {{width: '100%'}} className="signInButton">Sign In</button>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage
