import React from 'react'
import { Link } from 'react-router-dom'

function Following({trader}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div>
            <Link to = {`/profile/${trader.username}`} style = {{textDecoration: 'none', color: 'black'}}>
            <li className="sideBarFriendsListItem">
                <img src={trader.profilepicture ? PF + trader.profilepicture : PF + 'noavatar.svg'} alt="Traders" className="sideBarFriendsProfile" />
                <span className="sideBarFriendsName"> {trader.username} </span>
            </li>
            </Link>
        </div>
    )
}

export default Following
