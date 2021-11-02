import React, { useContext } from 'react'
import { MoreVert,FiberManualRecord, ThumbUpAltOutlined, ChatBubbleOutline, ShareOutlined, BookmarkBorder, ThumbUp, Opacity, Bookmark, Share, SentimentDissatisfied, ReportOutlined, Block, PersonAddDisabledOutlined, BookmarkBorderRounded } from '@material-ui/icons'
import { useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {format} from 'timeago.js'
import {AuthContext} from '../../context/AuthContext'
import './post.scss'
import axios from 'axios';

function Post({post}, ref) {
    const [likes, setLikes] = useState(post.likes.length);
    const [isLiked, setIsliked] = useState(false);
    const [commentContainerOpen, setCommentContainerOpen] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user:currentUser} = useContext(AuthContext);
    const [dropDownOpen, setDropDownOpen]= useState(false);
    const [comments, setComments] = useState([]);
    const [commentedUsers, setCommentedUsers] = useState([]);
    const [commentInput, setCommentInput] = useState('');
    const axiosInstance = axios.create(
        {
            baseUrl: process.env.REACT_APP_API_URL
        }
    )
    


    useEffect(
        ()=>
        {
            setIsliked(post.likes.includes(currentUser._id))
        }, [currentUser._id, post.likes]
    );
    useEffect(()=>
    {
        const fetchUser = async ()=>
        {
            const res = await axiosInstance.get(`/users/?userId=${post.userId}`);
            setUser (res.data)
        };
        fetchUser();
    },[post.userId]);   
    const likeHandler = ()=>
    {
        try 
        {
            axiosInstance.put("/posts/" + post._id + "/like", {userId:currentUser._id});
        }
        catch (err)
        {
            console.log(err)
        }
        setLikes(isLiked ? likes-1 : likes+1);
        setIsliked(!isLiked);
    }
    const handleMoreClick = ()=>
    {
        setDropDownOpen(!dropDownOpen)
    }
    const profileComponent = ()=>
    {
        return (
            <div className="postTopLeft">
                        <Link to= {`profile/${user.username}`} style = {{textDecoration: "none", display: "flex", alignItems:"center"}}>
                        <img src={user.profilepicture==="" ? PF + 'noavatar.svg': PF +user.profilepicture} alt="Profile" className="postProfileImage" />
                        <span className="postUserName">{user.username}</span>
                        </Link>                        
                        <FiberManualRecord className = "postDateDot"/>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
        )
    }
    const handleCommentIconClick = ()=>
    {
        setCommentContainerOpen(!commentContainerOpen);
        
        const fetchComments = async ()=>
        {
            const res = await axiosInstance.get(`/posts/comment/${post._id}`);
            setComments(res.data)
        };
        fetchComments();
        comments.forEach(eachComment=>
            {
               const fetchUsers = async ()=>
               {
                const  res = await axiosInstance.get('/users/', {params: {userId: eachComment.userId}});
                commentedUsers.push(res.data)
               }
               fetchUsers()
            })        
    }
    const handlePostComment = async (postId)=>
    {
        if (commentInput.length > 0)
        {
            const res = await axiosInstance.post(`/posts/comment/${postId}`, {postId: postId, userId: user._id, comment: commentInput});
        }
        setCommentInput('');
        console.log(commentInput)
    }
    console.log('This is commented users',commentedUsers)
    return (
        <div className = "post">
            <div className="postWrapper"> 
                <div className="postTop">
                   {profileComponent()}
                    <div className="postTopRight"> <MoreVert onClick = {handleMoreClick} className = "postMoreIcon"/> 
                        <div style={dropDownOpen ? {display: 'block'}: {display: 'none'}} className="moreDropDown">
                            <div className="dropDownWrapper">
                                <li><BookmarkBorderRounded className = 'dropDownIcons' /> Save</li>
                                <li><Share className = 'dropDownIcons'/> Share</li>
                                <li><PersonAddDisabledOutlined /> Unfollow {user.username}</li>
                                <li><SentimentDissatisfied className = 'dropDownIcons'/> Not interested</li>
                                <li><ReportOutlined className = 'dropDownIcons'/> Report this post</li>
                                <li><Block className = 'dropDownIcons' /> Block </li>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postCaption"> {post.description} </span>
                    <img src={PF + post.image} alt="PostImage" className="postImage" />
                </div>
                <hr className="postHr" />
                <div className="postBottom">
                    <div className="postBottomLeft">
                        {isLiked ? <ThumbUp style={{color:'#77ACF1'}} className ="postBottomIcon"  onClick = {likeHandler}/>: <ThumbUpAltOutlined className ="postBottomIcon" onClick = {likeHandler}/>}
                        <span style={likes <= 0 ?{opacity: 0}: {opacity: 1}} className="postBottomCounter"> {likes} </span>
                        <ChatBubbleOutline style = {{color: commentContainerOpen ? '#1976d2': '#9e9e9e'}} onClick = {handleCommentIconClick} className = "postBottomIcon" />
                        <span className="postBottomCounter"> {post.comments} </span>
                        <ShareOutlined className = "postBottomIcon"/>
                        <span className="postBottomCounter"> {post.shares} </span>
                    </div>
                    <div className="postBottomRight">
                        <BookmarkBorder  className = "postBottomIcon" />
                    </div>
                </div>
                <div style = {{display: commentContainerOpen ? 'block': 'none'}}  className="commentsContainer">
                    <form onSubmit={(e)=>e.preventDefault()} className="userInputContainer">
                        <img src={user.profilepicture==="" ? PF + 'noavatar.svg': PF +user.profilepicture}  alt="" />
                        <input onChange={(e)=>setCommentInput(e.target.value)} placeholder='Leave you thoughts here ...' type="text" />
                        <button style={{backgroundColor: commentInput.length >0 ? '#42a5f5': '#b3e5fc', cursor: commentInput.length > 0 ? '':'none'}} onClick = {()=>handlePostComment(post._id, )} type = {'submit'}>Comment</button>
                    </form>
                    <hr className='commentHr'/>
                    {comments.map(eachComment=>
                        {
                            commentedUsers.map(eachCommentedUser=>
                            {      
                                console.log('Comment',eachComment, 'User',eachCommentedUser)                         
                                    return (
                                        <div className="otherComments">
                                            <div style = {{marginLeft: '20px'}} className="postTopLeft">
                                                <Link to= {`profile/${user.username}`} style = {{textDecoration: "none", display: "flex", alignItems:"center", fontSize: '14px'}}>
                                                <img src={user.profilepicture==="" ? PF + 'noavatar.svg': PF +user.profilepicture} alt="Profile" className="postProfileImage" style={{width: '30px', height: '30px', borderRadius: '50%'}} />
                                                <span className="postUserName">{user.username}</span>
                                                </Link>                        
                                                <FiberManualRecord className = "postDateDot"/>
                                                <span className="postDate">{format(post.createdAt)}</span>
                                            </div>
                                            <div className="theirComment">
                                                <p className = {'commentContent'}>{eachComment.comment}</p>
                                            </div>
                                        </div>
                                    )
                            })
                        })}
                </div>
            </div>
        </div>
    )
}

export default Post
