import React, { useContext, useState, useEffect } from 'react'
import { DynamicFeed, Forum, Visibility, GroupAdd, Timeline, } from '@material-ui/icons'
import './leftbar.css'
import Following from '../following/Following'
import { Link } from 'react-router-dom'
import  axios  from 'axios'
import { AuthContext } from '../../context/AuthContext'

function Leftbar() {

    const [traders, setTraders] = useState([]);
    const { user } = useContext(AuthContext); 
    const length = traders.length  > 3;
    console.log(length)
    const axiosInstance = axios.create(
        {
            baseUrl: process.env.REACT_APP_API_URL
        }
    )
    
    


    useEffect(()=>
    {
        const fetchTraders = async ()=>
    {
        try
        {
           const res = await axiosInstance.get("/users/friends/"+user._id);
           setTraders(res.data)
            
        }catch(err)
        {
            console.log(err)
        }
    }
        fetchTraders();
    
    },[axiosInstance, user]);
    console.log(traders, user._id)
    return (
        <div className = "leftBar">
            <div className="sideBarWrapper">
                <ul className="sideBarList">
                    <Link to ="/" style = {{textDecoration: "none", color: "#000"}}>
                    <li className="sideBarListItem"> <DynamicFeed className = "sideBarListItemIcon" /> 
                        <span className="sideBarListItemText">Feed</span>
                        </li>
                    </Link>                   
                    <li className="sideBarListItem"> <Visibility className = "sideBarListItemIcon" /> 
                        <span className="sideBarListItemText">Watchlist</span>
                    </li>
                    <li className="sideBarListItem"> <Forum className = "sideBarListItemIcon" /> 
                        <span className="sideBarListItemText">Communities</span>
                    </li>
                    <li className="sideBarListItem"> <GroupAdd className = "sideBarListItemIcon" /> 
                        <span className="sideBarListItemText">Invite Traders</span>
                    </li>
                    <li className="sideBarListItem"> <Timeline className = "sideBarListItemIcon" /> 
                        <span className="sideBarListItemText">Trade</span>
                    </li>
                </ul>
                <hr className="sideBarHr" />
                <ul className="sideBarFriendsList">
                    <div style={length ? {display: 'flex'}: {display: 'none'}}  className="tradersYouFollow">Traders You Follow</div>
                    {
                        traders.map(trader=>
                            (
                                <Following key = {trader.id} trader = {trader} />
                            ))
                    }
                   
                </ul>
               <div style={length ? {display: 'flex'}: {display: 'none'}} className="showMoreButtonContainer">
                 <button className="showMoreFriendsButton">Show More</button>
               </div>
            </div>
        </div>
    )
}

export default Leftbar
