import axios from 'axios';
import React, { useState, useEffect } from 'react'
import './onlineTrader.css'

function OnlineTrader({traderOnline, currentUserId, setCurrentChat}) {
    const [tradersYouFollow, setTradersYouFollow] = useState ([]);
    const [onlineTraders, setOnlineTraders] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const axiosInstance = axios.create(
        {
            baseUrl: process.env.REACT_APP_API_URL
        }
    )
    
    

    useEffect(()=>{
        const fetchTraders = async ()=>
        {
            const res = await axiosInstance.get('/users/friends/'+currentUserId);
            setTradersYouFollow(res.data);
        }
        fetchTraders();
    },[axiosInstance, currentUserId])

    useEffect(()=>{
        setOnlineTraders(tradersYouFollow.filter((eachTrader)=>traderOnline.includes(eachTrader._id)));
    },[traderOnline, tradersYouFollow])

    const handleClick = async (user)=>
    {
        try 
        {
            const res = await axiosInstance.get(`/conversation/find/${currentUserId}/${user._id}`);
            setCurrentChat(res.data)
        }
        catch(err)
        {
            console.log(err)
        }
    }
    return (
        onlineTraders.map(eachOnlineTrader=> 
        <div className = "onlineTrader" onClick = {()=>handleClick(eachOnlineTrader)}>
            <div className="onlineTraderImageAndBatch">
                <img src={eachOnlineTrader?.profilePicture ? PF+eachOnlineTrader.profilePicture : PF + 'noavatar.svg'} alt="UserImage" className="onlineTraderImage" />
                <div className="onlineBatch"></div>
            </div>
            <span className="onlineTraderName">{eachOnlineTrader.username}</span>
        </div>
        )
    )
}

export default OnlineTrader
