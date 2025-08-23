import { useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import './Auth.css'

function SignUp() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      await axios.post('http://localhost:3000/auth/signup', {
        username,
        password
      })
      alert('User registered, please login')
      navigate('/login')
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Sign Up</h2>
        <input 
          placeholder="Username"
          className="login-input"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input 
          placeholder="Password"
          type="password"
          className="login-input"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" className="login-button">Sign Up</button>
      </form>
    </div>
  )
}
export default  SignUp