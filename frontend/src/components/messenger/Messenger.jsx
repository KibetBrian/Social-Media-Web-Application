import React, { useContext, useEffect, useRef, useState } from 'react'
import Conversation from '../Conversations/Conversation'
import { AuthContext } from '../../context/AuthContext'
import Message from '../message/Message'
import OnlineTrader from '../onlinetrader/OnlineTrader'
import TopBar from '../topbar/TopBar'
import './messenger.css'
import axios from 'axios'
import  { io } from 'socket.io-client'
import {WindowWidth} from '../../homepage/HomePage'
import BottomBar from '../BottomBar/BottomBar'
import ChatsComp from '../ChatsComp/ChatsComp'


function Messenger() {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const { user } = useContext(AuthContext);
    const [newMessage, setNewMessage] = useState('');
    const [socketMessage, setSocketMessage] = useState(null);
    const [onlineTrader, setOnlineTrader] = useState([]);
    const socket = useRef();
    const useScrollRef = useRef();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const axiosInstance = axios.create(
        {
            baseUrl: process.env.REACT_APP_API_URL
        }
    )
    

    //For smaller devices
    const [recentMessageOpen, setRecentMessageOpen] = useState(true);
    const [activeTradersOpen, setActiveTradersOpen] = useState(false);
    const [chatBoxOpen, setChatBoxOpen] = useState(false);

    const handleOpenRecentMessages = ()=>
    {
        setActiveTradersOpen(false);
        setChatBoxOpen(false)
        setRecentMessageOpen(true)
    }    
    const windowWidth = WindowWidth ();
    const acceptedWidth = windowWidth > 480;
    

    //Connect to the socket server and get messages
    useEffect(()=>
    {
        socket.current = io("ws://localhost:5500");
    },[]);

    //Send current user

    useEffect(()=>
    {
        socket.current.emit('addUser', user._id);
        socket.current.on('getUsers', (users)=>
        {
            
            setOnlineTrader(user.following.filter( (follow) => users.some( (eachSUser) =>eachSUser.userId === follow )));
            console.log(user.following)
        })
    },[user]);
    //Fetch conversations
    useEffect(()=>
    {
        const fetchConversations = async ()=>
        {
            try
            {
                const res = await axiosInstance.get('/conversation/'+ user._id);
                setConversations(res.data);
            }catch(err)
            {
                console.log(err)
            }
        }
        fetchConversations();
    },[axiosInstance, user._id])

    //Fetch messages
    useEffect(()=>
    {
        const getMessages = async ()=>
        {
            try
            {
                const fetchMessages = await axios.get('/messages/'+currentChat?._id);
                setMessages(fetchMessages.data)
            }
            catch(err)
            {
                console.log(err)
            }
        }
            getMessages();
    }, [currentChat]);

    //Socket message
    useEffect(()=>
    {
        socket.current.on('getMessage',data=>
        {
            setSocketMessage(
                {
                    sender: data.senderId,
                    text: data.text,
                    createdAt: Date.now()
                }
            )
        })
    },[])
    //Updating final message
    useEffect(()=>{
        socketMessage && currentChat?.members.includes(socketMessage.sender) && setMessages((prev)=>[...prev, socketMessage])
    },[socketMessage, currentChat]);
    //handle onuser click send message
    const handleSendMessage = async (e)=>
    {
        e.preventDefault();
        const message = 
        {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id
        }
        //Send message to the socket server
        
        try 
        {
            if (newMessage !== '')
            {
                const receiverId = currentChat.members.find(member=> member._id !== user._id);
        socket.current.emit('sendMessage', ({senderId: user._id, receiverId: receiverId, text: newMessage}))
            const res = await axios.post("/messages/", message);
            setMessages([...messages, res.data])
            
            setNewMessage('');
            }
        }
        catch(err)
        {
            console.log(err)
        }
    }
    useEffect(()=>
    {
        useScrollRef.current?.scrollIntoView({behavior: "smooth"});
    },
    [messages]);
    const handleRecentChats = (eachConversation)=>
    {
        if (windowWidth <= 480)
        {
            setRecentMessageOpen(false)
        }
        setCurrentChat(eachConversation)
        setChatBoxOpen(true)
    }
    const handleOpenOnlineTraders = ()=>
    {
        setChatBoxOpen(false);
        setRecentMessageOpen(false);
        setActiveTradersOpen(true);
        console.log('clicked')
    }
    return (
        <>
         {windowWidth >= 480 ? <TopBar />: <ChatsComp handleOpenOnlineTraders={handleOpenOnlineTraders} handleOpenRecentMessages = {handleOpenRecentMessages}/>}
        <div className = "messenger">
        <div className="chatMenu">
            <div style={recentMessageOpen ? {display: 'flex'}: {display: 'none'}} className="chatMenuWrapper">
                <input style = {windowWidth <=480 ? {display: 'none'}: {}} type="text" placeholder = "Search Trader" className="chatMenuInput" />
               {
                   conversations.map(eachConversation =>(

                       <div onClick = {()=>{handleRecentChats(eachConversation)}}>
                       <Conversation key = {eachConversation._id} conversation = {eachConversation} currentUser = {user}/>
                       </div>
                   ))
               }
            </div>
        </div>
        <div className="chatBox">
            <div className="chatBoxWrapper">
                {
                    currentChat ?
                <>                
                <div className="chatBoxTop">
                    {
                        messages.map((eachMessage)=>(
                            <div ref = {useScrollRef}>
                                <Message  message = {eachMessage} sender = {eachMessage.sender === user._id}/>
                            </div>
                        ))
                    }
                </div>
                <div className="chatBoxBottom">
                    <textarea placeholder = "Type your message"  onChange = {(e)=>setNewMessage(e.target.value)} value = {newMessage} type="text" className="userMessageInput" />
                    <button className="sendMessageButton" onClick = {handleSendMessage}>Send</button>
                </div>
                </>
:   <>
    <div className="startChatWrapper">
        <img src={PF + 'startchat.svg'} alt="StartChat"  className = "startChatImage"/>
        <span className="startChatTitle">Start Conversation with an Online Trader</span>
    </div>
    </>
}
            </div>
        </div>
        <div style={!activeTradersOpen && acceptedWidth ? {display: 'flex'}: {display: 'none'}} className="onlineTraders">
            <div className="onlineTradersWrapper">
            <h5 className="onlineTradersTitle">Online Traders</h5>
                <OnlineTrader key = {onlineTrader._id} traderOnline = { onlineTrader } currentUserId = {user._id} setCurrentChat = {setCurrentChat}/>
            </div>
        </div>
        </div>
       {windowWidth <= 480 ?  <BottomBar />: ''}
        </>
    )
}

export default Messenger
