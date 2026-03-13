import React, {useState, useRef} from 'react'
import "../style/createPost.scss"
import { usePost } from '../hook/usePost'
import { useNavigate } from 'react-router'

const CreatePost = () => {
  const [caption, setCaption] = useState('')
  const fileInputRef = useRef(null)

  const navigate = useNavigate()
  const {loading, handleCreatePost} = usePost()

//   const handleImageChange = (e) => {
//     const file = e.target.files[0]
//     if (file) {
//       setImage(file)
//     }
//   }

  if (loading) {
    return (<main><h1>Creating Post...</h1></main>)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const file = fileInputRef.current.files[0]

    await handleCreatePost(caption, file)
    
    navigate('/')
  }

  return (
    <main className='create-post-page'>
        <div className="form-container">
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="caption">Caption</label>
                <input 
                    type="text" 
                    id="caption" 
                    name="caption" 
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                />
                <label className='post-image-label' htmlFor="postImage">Select image</label>
                <input 
                    ref={fileInputRef}
                    hidden 
                    type="file" 
                    id="postImage" 
                    name="postImage" 
                    // onChange={handleImageChange}
                />
                <button className='button primary-button'>Create Post</button>
            </form>
        </div>
    </main>
  )
}

export default CreatePost