import React, { useEffect, useState } from 'react'
import BottomBar from '../components/BottomBar/BottomBar'
import Feed from '../components/feed/Feed'
import Leftbar from '../components/leftbar/LeftBar'
import RightBar from '../components/rightbar/RightBar'
import TopBar from '../components/topbar/TopBar'
import TopBar2 from '../components/TopBar2/TopBar2'
import './homePage.css'

export const  WindowWidth = () =>
{
    const [windowWidth, setWindowWidth] = useState(window.innerHeight);
    
    function getWindowWidth ()
    {
        setWindowWidth(window.innerWidth);
    }

    
    useEffect(()=>
    {
        window.addEventListener("resize", getWindowWidth);
        return () => 
        {
            window.removeEventListener("resize", getWindowWidth);
        }
    }, [windowWidth]);
    
    return windowWidth;
}


function HomePage() {
   const windowWidth = WindowWidth();

    return (
        <div>
         {windowWidth <= 480 ? <TopBar2 />: <TopBar />}
         <div className="homePageContainer">
         {windowWidth <= 480 ? '' : <Leftbar />}
         <Feed />
         {windowWidth <= 480 ? '' :<RightBar />}
        </div>  
         {windowWidth <= 480 ?<BottomBar />: ''}
        </div>
    )
}

export default HomePage
