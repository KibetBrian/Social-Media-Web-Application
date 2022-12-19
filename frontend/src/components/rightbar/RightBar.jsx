import React, { useContext, useEffect, useState } from 'react';
import Trending from '../trending/Trending';
import axios from 'axios'
import { Link }from 'react-router-dom'
import './rightbar.css'
import { AuthContext } from '../../context/AuthContext';
import { PersonAdd, Remove } from '@material-ui/icons'; 
import BottomBar from '../BottomBar/BottomBar';
import { WindowWidth } from '../../homepage/HomePage'


function RightBar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([])
    const {user:currentUser, dispatch} = useContext(AuthContext)
    const [followed, setFollowed] = useState(false);
    const [news, setNews] = useState([]);
    const windowWidth = WindowWidth();
    const axiosInstance = axios.create(
        {
            baseUrl: process.env.REACT_APP_API_URL
        }
    )
    
    useEffect(()=>
    {
        setFollowed(currentUser.following.includes(user?._id))
    }, [currentUser.following, user?._id]);
    console.log('This is current user',currentUser)
    useEffect(()=>
    {
        const fetchFriends = async ()=>
        {
            try
            {
                const friendList = await axiosInstance.get("/users/friends/"+user._id);
                 setFriends(friendList.data)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        fetchFriends();
    },[user])
    
    const handleClick = async () => {
        try 
        {
          if (followed) 
          {
            await axiosInstance.put("/users/"+user._id+"/unfollow", {userId: currentUser._id});
            dispatch({ type: "UNFOLLOW", payload: user._id });
            
          } 
        else 
        {
            await axiosInstance.put("/users/"+user._id+"/follow", {userId: currentUser._id});
            dispatch({ type: "FOLLOW", payload: user._id });
          }
          setFollowed(!followed)
        } 
        catch (err) {
        }
      };
    //Fetching news    
    useEffect(
        ()=>
        {
            const fetchNews = async() =>
            {   
               try
               {
                const fetchedNews = await axiosInstance.get('https://api.polygon.io/v2/reference/news?limit=10&order=descending&sort=published_utc&ticker=AAPL&published_utc.gte=2021-04-26&apiKey=JpeEVFwNfPKwkpfcDpaot6iVGnjI4pIJ');
                    setNews(fetchedNews.data.results)
               }
               catch(err)
               {
                   console.log(err)
               }
            }
            fetchNews();
        }
    );

    const HomeRightBar = ()=>
    {
        return(
            <>
                 <h2 className="trendingTitle"> Trending </h2>
            {
                news.map(newsObject=>(
                <Trending key = {newsObject.id} newsContent = {newsObject}/>
            ))
            }
            <div>                
                {windowWidth <= 480 ? <BottomBar /> : ''}
            </div>
            </>
        )
    }
    const ProfileRightBar = ()=>
    {
    
        return (
            <>
            { user.username !== currentUser.username && 
                (
                <button className="followButton" onClick = {handleClick}>
                   {followed ? "Unfollow" : "Follow"}{followed ? <Remove style={{marginLeft: "5px"}}/> : <PersonAdd style={{marginLeft:"5px"}}/>}
                </button>
                )
            }
            <div className = "rightBarUserInformation">
            <h4 className = "profileRightBarTitle">User Information</h4>
            <div className="rightBarInformation"> 
                <div className="rightBarInformationItem">
                    <span className="rightBarInformationKey">City: </span>
                    <span className="rightBarInformationValue">{user.city}</span>
                </div>
                <div className="rightBarInformationItem">
                    <span className="rightBarInformationKey">{user.location ?"From:":""}</span>
                    <span className="rightBarInformationValue">{user.location}</span>
                </div>
                <div className="rightBarInformationItem">
                    <span className="rightBarInformationKey">Experience: </span>
                    <span className="rightBarInformationValue">Junior</span>
                </div>
            </div>
            <h4 className = "profileRightBarTitle"> Following </h4>
            <div className="rightBarFollowings">
                {friends.map(friend=>
                (
                <Link to = {"/profile/" + friend.username} style = {{textDecoration: 'none', color:'#000'}}>
                    <div className="rightBarFollowing">
                    <img src={friend.profilepicture ? PF + friend.profilepicture : PF+ 'noavatar.svg'} alt="Profile" className="rightBarFollowingProfileImage" />
                    <div className="rightBarFollowingName">{friend.username}
                    
                    </div>
                    
                </div>
                </Link>)                  

)}
            </div>

            </div>
            </>
        )
    }
    return (
        <div className="rightBar">
            {user ? <ProfileRightBar />: <HomeRightBar />}
        </div>
    )
}

export default RightBar
