import React, {useState} from 'react'
import "../style/form.scss"
import { Link } from 'react-router'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { handleLogin, loading } = useAuth()
  const navigate = useNavigate()

  if (loading) {
    return <p>Loading...</p>
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleLogin(username, password)
    .then((response) => {
        console.log("Login successful:", response)
        navigate('/')
    })
    .catch((error) => {
      console.error("Login failed:", error)
    })
  }

  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Enter Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='button primary-button'>Login</button>
            </form>

            <p>Don't have an account? <Link className='toggleAuthForm' to="/register">Register</Link></p>
        </div>
    </main>
  )
}

export default Login