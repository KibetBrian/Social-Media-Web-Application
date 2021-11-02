import React from 'react'
import './trending.css'

function Trending({newsContent}) {
    const openSource = ()=>
    {
        window.open(newsContent.article_url)
    }
    return (
        <div className="trending">
            <div className="trendingWrapper">
                <div className="trendingNews">
                    <img src= {newsContent.image_url} alt="News" className="trendingNewsImage" />
                    <div className="trendingNewsContent">
                        <h5 className="trendingNewsTitle" onClick = {openSource}>{newsContent.title}</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Trending
