import { Link, useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import { getUserInfoDetails } from '../../services/userInfoService'

const NavBar = ({ onLogout }) => {
  const navigate = useNavigate()
  const [hasUserInfo, setHasUserInfo] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is logged in (based on token for example)
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)

    if (token) {
      const fetchUserInfoStatus = async () => {
        try {
          const response = await getUserInfoDetails()
          setHasUserInfo(!!response.data)
        } catch (error) {
          setHasUserInfo(false)
        }
      }
      fetchUserInfoStatus()
    }
  }, [])

  const handleUserInfoClick = () => {
    if (hasUserInfo) {
      navigate('/user-info/:id')
    } else {
      navigate('/user-info/new')
    }
  }

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>

      {isLoggedIn ? (
        <>
          <Link to="/foods" className="nav-link">Foods</Link>
          <button onClick={handleUserInfoClick} className="nav-button">
            User Info
          </button>
          <button onClick={onLogout} className="nav-button logout-button">
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/signup" className="nav-link">Sign Up</Link>
        </>
      )}
    </nav>
  )
}

export default NavBar
