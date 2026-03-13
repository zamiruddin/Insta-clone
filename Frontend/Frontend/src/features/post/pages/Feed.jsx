import React, {use, useEffect} from 'react'
import "../style/feed.scss"
import Post from '../components/Post'
import { usePost } from '../hook/usePost'
import Nav from '../../shared/components/Nav'

const Feed = () => {
    const { feed, handleGetFeed, loading, handleLike, handleUnlike } = usePost()

    useEffect(() => {
        handleGetFeed()
    }, [])  

    if(loading || !feed) {
        return (<main><h1>Feed is Loading....</h1></main>)
    }

    return (
     <main className='feed-page'>
            <Nav />
            <div className="feed">
                <div className="posts">
                    {feed.map(post => (
                        <Post key={post._id} post={post} user={post.user} loading={loading} handleLike={handleLike} handleUnlike={handleUnlike}/>
                    ))}
                </div>
            </div>
    </main>
  )
}

export default Feed