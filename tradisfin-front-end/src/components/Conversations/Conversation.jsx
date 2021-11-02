import React, { useEffect, useState } from 'react'
import { axios } from 'axios';
import './conversation.css'

function Conversation({conversation, currentUser}) {

  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const axiosInstance = axios.create(
    {
        baseUrl: process.env.REACT_APP_API_URL
    }
)


  const traderId = conversation.members.find((member) => member !== currentUser._id);
  useEffect(()=>
  {
      const fetchTrader = async()=>
      {
        try
        {
          const res = await axiosInstance.get('/users/?userId='+traderId);
          setUser(res.data)
        }
        catch(err)
        {
          console.log(err)
        }
      }
      fetchTrader();
  },[axiosInstance, conversation, currentUser, traderId])
    return (
        <div className = 'conversation'>
          <div className="conversationWrapper">
            {console.log (user, 'this is user')}
            <img src={user.profilepicture? PF + user.profilepicture : PF + 'noavatar.svg'} alt="UserImage" className="conversationImage" />
            <span className="conversationUserName">{user.username}</span>
          </div>
        </div>
    )
}

export default Conversation
