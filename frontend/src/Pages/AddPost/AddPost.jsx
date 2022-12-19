import {CameraAlt, Close, InsertPhoto, Public, TagFacesOutlined, Videocam } from '@material-ui/icons';
import React from 'react'
import './addPost.scss'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import {useRef} from  'react'
import { Link } from 'react-router-dom';

function AddPost() {
    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const userInput = useRef();
    return (
        <div className='addPost'>
            <div className="addPostWrapper">
                <div className="top">
                    <div className="firstDiv">
                        <Link to = {'/'} >
                            <Close className = 'closeIcon'/>
                        </Link>
                        <h4>Share Post</h4>
                    </div>
                    <div className="lastDiv">
                        <h4 style={{color: '#9e9e9e'}}>Post</h4>
                    </div>
                </div>
                <div className="center">
                    <div className="imgContainer">
                        <img src= {user.profilePicture ?PF + user.profilePicture: PF + 'noavatar.svg' } alt={user.username} />
                    </div>
                    <div className="nameContainer">
                        <div className="wrapper">
                            <h6>{user.username}</h6>
                            <select name="" id="">
                                <option  value="anyone">Anyone </option>
                                <option value="peopleYouFollow">People You Follow</option>
                                <option value="only you">Only You</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div onClick={()=>userInput.current.focus()} className="centerInput">
                    <input ref = {userInput} placeholder='What do you want to talk about ?' type="text" />
                </div>
                <div className="bottom">
                    <CameraAlt />
                    <Videocam />
                    <InsertPhoto />
                    <div className="addTag">
                    <TagFacesOutlined className='tagIcon' />Add Tag
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPost
