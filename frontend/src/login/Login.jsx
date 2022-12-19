import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext'
import { loginCall } from '../apiCall';
import { CircularProgress } from '@material-ui/core'
import { Link } from 'react-router-dom';
import './login.scss'

function Login() {

    const { isFetching, error, dispatch } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = (e) => {
        e.preventDefault();
        loginCall({ email: email, password: password }, dispatch);
    };
    
    return (
        <div className="login">

            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo"> TradisFin </h3>
                    <p className="loginDescription">Connect with other traders around the world</p>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input type="email" required placeholder="Enter your email" className="loginInput" onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" minLength="8" required placeholder="Password" className="loginInput" onChange={(e) => setPassword(e.target.value)} />
                        {error && (<span className="invalidCredentialsSpan">{console.log(isFetching)} email and password did not match, try again</span>)}
                        <button type="submit" className="loginButton" disabled={isFetching}>{isFetching ? <CircularProgress style={{ color: "#fff" }} /> : "Log In"}</button>
                        <Link to={'/forgot-password'} style={{ textDecoration: 'none' }}>
                            <span className="forgotPasswordText">Forgot Password ?</span>
                        </Link>
                        <Link to='/register' style={{ textDecoration: 'none', display: 'flex' }}>
                            <button type="submit" style={{ width: '100%' }} className="createAnAccountButton"> Create a new account </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
