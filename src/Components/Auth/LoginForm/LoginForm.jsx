import { useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import '../Auth.css'

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
<<<<<<< HEAD:src/Components/Auth/LoginForm/LoginForm.jsx
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input 
          placeholder="Username"
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
        <input 
=======
    <div className="login-page">
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
>>>>>>> 3bf968e7537954d88c003e965e5082004a8de291:src/LoginForm.jsx
          placeholder="Password"
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
<<<<<<< HEAD:src/Components/Auth/LoginForm/LoginForm.jsx
        />
        <button type="submit">Login</button>
=======
          required
        />
        <button type="submit" className="login-button">Login</button>
>>>>>>> 3bf968e7537954d88c003e965e5082004a8de291:src/LoginForm.jsx
      </form>
    </div>
  )
}

export default LoginForm
