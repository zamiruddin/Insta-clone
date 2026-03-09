import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'


const Register = () => {
    const {loading, handleRegister} = useAuth()
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        await handleRegister(username, email, password)
        .then((response) => {
            console.log("Registration successful:", response)
        })
        .catch((error) => {
            console.error("Registration failed:", error)
        })
        .finally(() => {            
            navigate('/')
        })
        
    }

    if(loading) {
        return <main><h1>Loading...</h1></main>
    }

  return (
    <main>
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                onChange={(e) => {setUsername(e.target.value)}} 
                type="text" 
                name="username" 
                placeholder='Enter Username' />

                <input 
                onChange={(e) => {setEmail(e.target.value)}} 
                type="email" 
                name="email" 
                placeholder='Enter Email' />

                <input 
                onChange={(e) => {setPassword(e.target.value)}} 
                type="password" 
                name="password" 
                placeholder='Enter Password' />

                <button type='submit'>Register</button>
            </form>

            <p>Already have an account? <Link className='toggleAuthForm' to="/login">Login</Link></p>

        </div>
    </main>
  )
}

export default Register
