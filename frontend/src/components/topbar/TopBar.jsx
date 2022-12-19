import React, { useContext,useState } from 'react'
import { Search, Person, Chat, Notifications, ArrowDropDown } from '@material-ui/icons';
import { Link } from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'
import axios from 'axios'
import './topBar.scss';
import { logout } from '../../context/AuthActions';

function TopBar() {
    const { user, dispatch } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [searchInput, setSearchInput] = useState('');
    const [searchedUser, setSearchedUser] = useState([]);
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const axiosInstance = axios.create(
        {
            baseUrl: process.env.REACT_APP_API_URL
        }
    )
    
    
    const handleSearch = (e)=>
    {
        if(e.key === 'Enter')
        {
            fetchUser();
        }
    };

    const handleLogOut = ()=>
    {
        dispatch(logout(dispatch));
        localStorage.clear(); 
    }
    const fetchUser = async()=>
    {
       try 
       {
        const fetchedUser = await axiosInstance.get('/users/?username='+searchInput);
        setSearchedUser(fetchedUser.data);
       }
       catch (err)
       {
            console.log(err)
       }
    }  
    
    const clearSearch = ()=>
    {
        setSearchedUser([]);
    }
    const handleProfileClick = ()=>
    {
        setDropDownOpen(!dropDownOpen)
    }

    const SearchList = ()=>
    {
        return (
            <div className="searchResults" onClick = {clearSearch}>                   
                    <ul className = "searchResultList">
                        <li className = "searchResultListItem">
                            <Link to ={ "/profile/"+searchedUser.username} style = {{textDecoration: 'none', color: '#000', display: 'flex', alignItems: 'center'}}>
                            <img className = "searchedUserProfile" src={searchedUser.profilepicture ? PF + searchedUser.profilepicture : PF + 'noavatar.svg'} alt="" />
                            <span className="searchedUserUserName">{searchedUser.username}</span>
                             </Link>
                        </li>
                    </ul>
                </div>
        )
    }
    return (
        <div className="topBarContainer">
            <div className="topBarLeft">
                <Link to = '/' style = {{textDecoration: "none"}}>
                     <span className="logo">TradisFin</span>
                </Link>
            </div>
            <div className="topBarCenter">
                <div className="searchBar">
                    <input onKeyDown = {handleSearch} onChange={(e)=>{setSearchInput(e.target.value)}} type="text" placeholder = "Search for trends, topics, traders ..." className="searchInput" />
                    <Search className="searchIcon"/>
                </div>
                {searchedUser.username && <SearchList />}
            </div>
            <div className="topBarRight">
                <div className="topBarLinks">
                    <div className="topBarLink"></div>
                    <div className="topBarLink"></div>
                </div>
                <div className="topBarIcons">
                    <div className="topBarIcon">
                        <Person />
                        <span className="topBarIconBadge">1</span>
                    </div>
                    <Link to = '/messenger' style = {{textDecoration: 'none', color: '#fff'}}>
                    <div className="topBarIcon">
                        <Chat />
                    </div>
                    </Link>
                    <div className="topBarIcon">
                        <Notifications />
                        <span className="topBarIconBadge">1</span>
                    </div>
                </div>
                <div className="profileIcon">
                    <img onClick={handleProfileClick} src= { user.profilepicture ? PF + user.profilepicture : PF + 'noavatar.svg'} alt="User Profile" className="topBarImageIcon" />
                    <span onClick={handleProfileClick}>Me <ArrowDropDown /> </span>
                    <div style={dropDownOpen ? {display: 'flex'}: {display : 'none'}} className="dropDown">
                        <div className="top">
                            {console.log('This is dropdown menu',dropDownOpen)}
                            <div className="topTop">
                                <div className="topTopLeft">
                                    <img src= { user.profilepicture ? PF + user.profilepicture : PF + 'noavatar.svg'} alt="User Profile" className="topBarImageIcon" />
                                </div>
                                <div className="topTopRight">
                                    <h5>{user.username}</h5>
                                    <p>Trader</p>
                                </div>
                            </div>
                            <div className="topBottom">
                            <Link onClick={()=>setDropDownOpen(false)} style={{width: '90%'}} to = {`/profile/${user.username}`}>
                                <button>View Profile</button>
                            </Link>
                            </div>
                        </div>
                        <div className="hr"></div>
                        <div className="middle">
                            <h5>Account</h5>
                            <Link style={{textDecoration: 'none'}}>
                                <p>{'Post & Activity'}</p>
                            </Link>
                            <Link style={{textDecoration: 'none'}}>
                                <p>{'Setting & Privacy'}</p>
                            </Link>
                            <Link style={{textDecoration: 'none'}}>
                                <p>Language</p>
                            </Link>
                        </div>
                        <div className="hr"></div>
                        <div className="bottom">
                            <button onClick={handleLogOut}>Log Out</button>
                        </div>
                    </div>
                </div>                
            </div>
        </div>
    )
}

export default TopBar
