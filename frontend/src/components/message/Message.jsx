import React from 'react'
import './message.css'
import  {format} from 'timeago.js'


function Message({message, sender}) {
    //const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className = {sender ? "message sender": "message"}>
            <div className="messageTop">
                <img src="/assets/brianphoto.jpg" alt="UserImage" className="messageImage" />
                <span className="messageTopText">{message.text}</span>
            </div>
            <div className="messageBottom">
                <span className="messageBottomText">{format(message.createdAt)} </span>
            </div>
        </div>
    )
}

export default Message
