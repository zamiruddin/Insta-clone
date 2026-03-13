import { getFeed, createPost } from "../services/post.api"
import { useContext } from "react"
import { PostContext } from "../post.context.jsx"
import { likePost, unlikePost } from "../services/post.api"

export const usePost = () => {
    const context = useContext(PostContext)

    const {loading, setLoading, post, feed, setFeed} = context

    const handleGetFeed = async () => {
        setLoading(true)
        try {
            const data = await getFeed()
            setFeed(data.posts)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleCreatePost = async (caption, image) => {
        setLoading(true)
        try {
            const data = await createPost(caption, image)
            setFeed((prevFeed) => [data.post, ...prevFeed])
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleLike = async (postId) => {
        
        const data = await likePost(postId)
        await handleGetFeed()
        
    }

    const handleUnlike = async (postId) => {
        
        const data = await unlikePost(postId)
        await handleGetFeed()
    }

    return {
        loading,
        feed,
        post,
        handleGetFeed,
        handleCreatePost,
        handleLike,
        handleUnlike
    }
}