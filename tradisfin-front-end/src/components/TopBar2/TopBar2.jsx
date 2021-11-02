import React from 'react'
import {Chat, Search} from '@material-ui/icons'
import './topBar2.scss'
import {Link} from 'react-router-dom'

function TopBar2() {
    return (
        <div className='topBar2'>
            <div className="topBar2Wrapper">
                <div className="logo"> 
                <Link style = {{color: '#fff', textDecoration: 'none'}} to = {'/'}>
                   <h4>T</h4>
                </Link>
                </div>
                <div className="inputContainer">
                    <input placeholder='Search for topics, news, traders ...' type="text" />
                    <Search className = 'search'/>
                </div>
                <div className="messageContainer">
                    <Link style = {{color: '#fff', textDecoration: 'none'}} to = {'/messenger'}>
                        <Chat className = 'chatIcon'/> 
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default TopBar2
