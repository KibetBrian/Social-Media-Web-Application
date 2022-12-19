import React from 'react'
import Feed from '../components/feed/Feed'
import Leftbar from '../components/leftbar/LeftBar'
import TopBar from '../components/topbar/TopBar'
import RightBar from '../components/rightbar/RightBar'
import { useState, useEffect } from 'react';
import { format } from 'timeago.js'
import axios from 'axios'
import {WindowWidth} from '../homepage/HomePage'
import { useParams } from 'react-router'
import BottomBar from '../components/BottomBar/BottomBar'
import './profile.scss'
import { Add } from '@material-ui/icons'

function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const windowWidth = WindowWidth();
    const username = useParams().username;
    const axiosInstance = axios.create(
        {
            baseUrl: process.env.REACT_APP_API_URL
        }
    )
    

    useEffect(()=>{
        const fetchUser = async()=>
        {
            const res = await axiosInstance.get(`/users/?username=${username}`);
            setUser(res.data)
        }
        fetchUser();
    },[username]);
    return (
        <div>
            {windowWidth >= 480 ? <TopBar />: ''}
           <div className="profile">
           {windowWidth >= 480 ? <Leftbar />: ''}
            <div className="profileWrapper">
                <div className="profileWrapperTop">
                    <div className="profileImages">
                        <img src= {user.coverpicture==="" ? PF + 'defaultcoverphoto.svg': PF +user.coverpicture} alt="Profile" className = "coverProfilePhoto"/>
                        <img src={user.profilepicture==="" ? PF + 'noavatar.svg': PF +user.profilepicture} alt="Profile" className="profileImagePhoto" />
                    </div>
                    <div className="profileDetails">
                        <h4 className="profileDetailsName">{user.username}</h4>
                        <p>Joined {format(user.createdAt)}</p>
                        <p className="profileDetailsBio">{user.description}</p>
                    </div>
                </div>
                <div className="followerCount">
                    <div className="following">
                        <h3>197</h3>
                        <p>Following</p>
                    </div>
                    <div className="followers">
                        <h3>201</h3>
                        <p>Followers</p>
                    </div>
                </div>    
                <div style={username === user.username ? {display: 'none'}: {display: 'flex'}} className="followButtonContainer">
                    <button>Follow <Add /> </button>
                </div>
                <div className="profileWrapperBottom">
                    <Feed username = { username }/>
                    {windowWidth >= 480 ? <RightBar user = { user } />: ''}
                </div>  
            </div>
           </div>
           {windowWidth <=480 ? <BottomBar />: ''}
        </div>
    )
}

export default Profile
