import React, { useContext, useRef, useState } from 'react'
import { PermMedia, Label, SentimentVerySatisfied, Cancel } from '@material-ui/icons'
import {AuthContext} from '../../context/AuthContext';
import axios from 'axios'
import './share.scss'

function Share({userDetails}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user} = useContext (AuthContext);
    const userContent = useRef();
    const [file, setFile] = useState(null);
    const axiosInstance = axios.create(
        {
            baseUrl: process.env.REACT_APP_API_URL
        }
    )
    


    const submitHandler= async (e)=>
    {
        e.preventDefault();
        
        const post = 
        {
            userId: user._id,
            description: userContent.current.value,
        }
        if (file)
        {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append('name', fileName);
            data.append('file', file);
            post.image = fileName;

            try 
            {
                await axiosInstance.post('/upload', data)
            }catch(err)
            {
                console.log(err)
            }
        }
        try
        {
            await axiosInstance.post('/posts/', post)
            window.location.reload();

        }catch(err)
        { 
            console.log(err)
        }
    }

    return (
        <div className = "share">
            <form className="shareWrapper" onSubmit = {submitHandler}>
                <div className="shareTop">
                    <img src={ user.profilepicture ? PF+user.profilepicture : PF + 'noavatar.svg'} alt="User" className="shareProfileImage" />
                    <input type="text" ref= {userContent} placeholder = "Whats on your mind?" className = "shareInput"/>
                </div>
                <hr className="shareHr" />
                {file &&(
                    <div className="stageImageContainer">
                        <img src={URL.createObjectURL(file)} className = "stagedImage" alt="" />
                        <Cancel className = "stageImageCancel" onClick = {()=>setFile(null)}/>
                    </div>
                )}
                <div className="shareBottom">
                    <div className="shareOptions">
                        <label htmlFor = 'file' className="shareOption">
                            <PermMedia className = "shareIcon"/>
                            <span className = "shareOptionText" >Photo</span>
                            <input style = {{display: "none"}} type ='file' id = 'file' accept = ".jpg, .png, .jpeg" onChange = {(e)=>setFile(e.target.files[0])}/>
                        </label>
                        <div className="shareOption tag">
                            <Label className = "shareIcon"/>
                            <span className = "shareOptionText" >Tag</span>
                        </div>
                        <div onClick={()=>userContent.current.focus()} className="shareOption">
                            <SentimentVerySatisfied className = "shareIcon"/>
                            <span className = "shareOptionText" >Random Thoughts</span>
                        </div>
                    </div>
                 <button type= "submit" className = "shareButton">Share</button>
                </div>
            </form>
        </div>
    )
}

export default Share
