import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import {AuthContext} from '../../context/AuthContext';
import  axios  from 'axios'
import './feed.css'

function Feed({ username }) {
    const [posts, setPost] =  useState([]);
    const axiosInstance = axios.create(
        {
            baseUrl: process.env.REACT_APP_API_URL
        }
    )
    

    const {user} = useContext(AuthContext)

    useEffect(()=>
    {
       const fetchPosts = async ()=>
       {
            const res = username 
            ? await axiosInstance.get('/posts/profile/'+ username)
            : await axiosInstance.get('/posts/timeline/'+ user._id);
            setPost(res.data.sort((p1,p2)=>
            {
                return new Date(p2.createdAt) - new Date (p1.createdAt)
            }));
       }
       fetchPosts();
    },[username, user._id, axiosInstance]);
    return (
        <div className = "feed">
            <div className="feedWrapper">
               { (!username ||username === user.username) && <Share /> } 
                {posts.map(p=>(
                    <Post key = {p._id} post = {p}/>
                ))}
            </div>
        </div>
    )
}

export default Feed
