
import { useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const res = await axios.post('http://localhost:3000/auth/login', {
        username,
        password
      })
      localStorage.setItem('token', res.data.token)
      
      onLogin(res.data.token)
      navigate('/foods')
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <input 
          className="login-input"
          placeholder="Username"
          value={username}
          onChange={event => setUsername(event.target.value)}
          required
        />
        <input 
          className="login-input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          required
        />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  )
}

export default LoginForm