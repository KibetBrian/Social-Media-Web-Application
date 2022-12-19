import { SearchOutlined } from '@material-ui/icons'
import React from 'react'
import { useState } from 'react'
import './chatComps.scss'

function ChatsComp({handleOpenRecentMessages, handleOpenOnlineTraders}) {
    
    return (
        <div className='chatsComp'>
            <div className="chatsCompWrapper">
                <div className="top">
                    <div className="left">
                        <h1>Chats</h1>
                    </div>
                    <div className="right">
                        <SearchOutlined className = {'searchIcon'} />
                    </div>
                </div>
                <div className="bottom">
                    <button onClick={handleOpenRecentMessages}>Recent Chats</button>
                    <button onClick={handleOpenOnlineTraders}>Active</button>
                </div>
            </div>
        </div>
    )
}

export default ChatsComp
