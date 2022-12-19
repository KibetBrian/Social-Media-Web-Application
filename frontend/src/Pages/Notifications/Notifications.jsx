import React from 'react'
import { useContext } from 'react'
import BottomBar from '../../components/BottomBar/BottomBar';
import { AuthContext } from '../../context/AuthContext'
import './notifications.scss'

function Notifications() {
    const {user}= useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className='notifications'>
            <div className="top">
                <h4>NOTIFICATIONS</h4>
                <h4>Mark all as read</h4>
            </div>
            <div className="center">
                <li style={{backgroundColor: '#f0f6fa'}}>
                    <img src={user.profilepicture ? PF+user.profilepicture: PF + 'noavatar.svg'} alt={user.username} />
                    <div><h5>{user.username}</h5><p>This is notification</p></div>
                </li>
                <li>
                    <img src={user.profilepicture ? PF+user.profilepicture: PF + 'noavatar.svg'} alt={user.username} />
                    <div><h5>{user.username}</h5><p>This is notification</p></div>
                </li>
                <li style={{backgroundColor: '#f0f6fa'}}>
                    <img src={user.profilepicture ? PF+user.profilepicture: PF + 'noavatar.svg'} alt={user.username} />
                    <div><h5>{user.username}</h5><p>This is notification</p></div>
                </li>
                <li>
                    <img src={user.profilepicture ? PF+user.profilepicture: PF + 'noavatar.svg'} alt={user.username} />
                    <div><h5>{user.username}</h5><p>Hey, the dashboard you've built looks nice</p></div>
                </li>
                <li>
                    <img src={user.profilepicture ? PF+user.profilepicture: PF + 'noavatar.svg'} alt={user.username} />
                    <div><h5>{user.username}</h5><p>This is notification</p></div>
                </li>
                <li>
                    <img src={user.profilepicture ? PF+user.profilepicture: PF + 'noavatar.svg'} alt={user.username} />
                    <div><h5>{user.username}</h5><p>Comment on thompson's post</p></div>
                </li>
            </div>
            <BottomBar />
        </div>
    )
}

export default Notifications
