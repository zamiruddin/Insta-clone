import { getFeed } from "../services/post.api"
import { useContext } from "react"
import { PostContext } from "../post.context.jsx"

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

    return {
        loading,
        feed,
        post,
        handleGetFeed
    }
}