import { jwtDecode } from 'jwt-decode'
import { useState, useEffect } from "react";
import FoodList from "./Components/FoodList/FoodList"
import FoodForm from "./Components/FoodForm/FoodForm"
import UpdateFoodForm from "./Components/UpdateFoodForm/UpdateFoodForm"
import FoodPerDay from "./Components/FoodPerDayList/FoodPerDayList"
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import LoginForm from './LoginForm'
import SignUp from './SignupForm'
import LogoutButton from './LogoutButton'
import Home from './Home'
import ProtectedRoute from './ProtectedRoutes'
import axios from 'axios';

const App = () => {
  const [formIsShown, setFormIsShown] = useState(false)
  const [isFormUpdated, setIsFormUpdated] = useState(false)
  const [selectedFood, setSelectedFood] = useState(null)
  const [foods, setFood] = useState([])
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [tokenId, setTokenId] = useState("")
  const [todaysFood, setTodaysFood] = useState([])


  function handleLogin(newToken) {
    setToken(newToken)
  }

  function handleLogout() {
    setToken(null)
    localStorage.removeItem('token')
  }

  // This is how to decode the token and gget the 
  // information that you added to the payload in your login 
  // route in the backend
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setTokenId(decodedToken.id);
    }
  }, [token]);


  const handleClick = () => {
    setFormIsShown(true)
  }

  const handleAddFood = async (foodId, quantity) => {
    try {
      if (!tokenId) {
        console.error("User ID (tokenId) is missing");
        return;
      }
      const res = await axios.post(`${import.meta.env.VITE_BACK_END_SERVER_URL}/foods-per-day/add`, {
        foodId,
        quantity,
        userId: tokenId
      });
      console.log("Updated log:", res.data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log("The token id in the app", tokenId)
  return (

    <Router>
      <div>
        {token ? <LogoutButton onLogout={handleLogout} /> : null}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/foods"
            element={
              <ProtectedRoute>
                <>
                  {formIsShown
                    ?
                    <FoodForm setFormIsShown={setFormIsShown} userId={tokenId} />
                    :
                    isFormUpdated
                      ?
                      <UpdateFoodForm foodId={selectedFood._id} setIsFormUpdated={setIsFormUpdated} />
                      :
                      <>
                        <button onClick={handleClick}>Add New Food</button>
                        <FoodList setIsFormUpdated={setIsFormUpdated} isFormUpdated={isFormUpdated} setSelectedFood={setSelectedFood} foods={foods} setFood={setFood} userId={tokenId} handleAddFood={handleAddFood} />
                      </>
                  }

                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/foods-per-day"
            element={
              <ProtectedRoute>
                <FoodPerDay tokenId={tokenId} todaysFood={todaysFood} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>

  )


}

export default App

