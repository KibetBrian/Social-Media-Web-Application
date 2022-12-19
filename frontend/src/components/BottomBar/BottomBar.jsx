import { AccountCircle, AddBox, Home, Notifications, Whatshot } from '@material-ui/icons'
import React from 'react'
import { useContext } from 'react'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './bottomBar.scss'

function BottomBar() {
    const {user} = useContext(AuthContext)
    return (
        <div className='bottomBar'>
            <Link to = "/" style={{color: '#77ACF1'}}>
                <Home />
            </Link>
            <Link to = 'trending' style={{color: '#77ACF1'}}>
                <Whatshot />  
            </Link>
            <Link to = {'/add-post'} style={{color: '#77ACF1'}}>
                <AddBox />
            </Link>
            <Link to = {'/notifications'} style={{color: '#77ACF1'}}>
                <Notifications />
            </Link>
            <Link to = {`/profile/${user.username}`} style={{color: '#77ACF1'}}>
                <AccountCircle />
            </Link>
        </div>
    )
}

export default BottomBar
