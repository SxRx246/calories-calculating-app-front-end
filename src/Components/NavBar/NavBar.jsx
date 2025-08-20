import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getUserInfoDetails } from '../services/userInfoService'


const NavBar = () => {
  const navigate = useNavigate()
  const [hasUserInfo, setHasUserInfo] = useState(null)

  useEffect(() => {
    const fetchUserInfoStatus = async () => {
      try {
        const response = await getUserInfoDetails()
        setHasUserInfo(!!response.data)
      } catch (error) {
        setHasUserInfo(false)
      }
    }
    fetchUserInfoStatus()
  }, [])

  const handleUserInfoClick = () => {
    if (hasUserInfo) {
      navigate('/user-info')
    } else {
      navigate('/user-info/create')
    }
  }

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/foods" className="nav-link">Foods</Link>
      <button onClick={handleUserInfoClick} className="nav-button">
        User Info
      </button>
    </nav>
  )
}

export default NavBar