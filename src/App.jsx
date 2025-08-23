import { jwtDecode } from 'jwt-decode'
import { useState, useEffect } from "react";
import FoodList from "./Components/FoodList/FoodList"
import FoodForm from "./Components/FoodForm/FoodForm"
import UpdateFoodForm from "./Components/UpdateFoodForm/UpdateFoodForm"
import FoodPerDay from "./Components/FoodPerDayList/FoodPerDayList"
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import LoginForm from './Components/Auth/LoginForm'
import SignUp from './Components/Auth/Signupform'
import LogoutButton from './Components/Auth/LogoutButton'
import Home from './Home'
import ProtectedRoute from './ProtectedRoutes'
import axios from 'axios';
// import ProtectedRoute from './ProtectedRoutes';
import './App.css'
import Navbar from './Components/Navbar/Navbar';
import UserInfoForm from './Components/UserInfoForm/UserInfoForm';
// import UserInfoPage from './Components/UserInfoPage/UserInfoPage';
import UpdateUserInfoForm from './Components/UpdateUserInfoForm/UpdateUserInfoForm';
import Footer from './Components/Footer/Footer';
import Logo from './Components/Logo/Logo';

const App = () => {
  const [formIsShown, setFormIsShown] = useState(false)
  const [isFormUpdated, setIsFormUpdated] = useState(false)
  const [selectedFood, setSelectedFood] = useState(null)
  const [foods, setFood] = useState([])
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [tokenId, setTokenId] = useState("")
  const [todaysFood, setTodaysFood] = useState([])
  const [addSuccessMessage, setAddSuccessMessage] = useState("");
  const [addedFoodIds, setAddedFoodIds] = useState([]);
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

  const baseURL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`

    const getTodaysFoods = async () => {
        try {
            const res = await axios.get(`${baseURL}/foods-per-day/${tokenId}`);
            setTodaysFood(res.data.foods || []);
        } catch (err) {
            console.error("Error fetching today's foods:", err);
        }
    };

  const handleAddFood = async (foodId, quantity, foodName) => {
    try {
      if (!tokenId) {
        console.error("User ID (tokenId) is missing");
        return;
      }

      const res = await axios.post(`${baseURL}/foods-per-day/add`, {
        foodId,
        quantity,
        userId: tokenId
      });
      
      setAddSuccessMessage(`${foodName} has been added to your Today's List!`);
      getTodaysFoods();
      console.log("Updated log:", res.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = async (foodIdToDelete) => {
    try {
      await axios.delete(`${baseURL}/foods-per-day/${tokenId}/food/${foodIdToDelete}`, {
        data: { foodId: foodIdToDelete },
      });
      // Refresh food list after deletion
      const response = await axios.get(`${baseURL}/foods-per-day/${tokenId}`);
      setFood(response.data.foods || []);
    } catch (error) {
      console.error("Error deleting food:", error);
    }
  };

  console.log("The token id in the app", tokenId)
  return (

    <Router>
      {token ? <LogoutButton onLogout={handleLogout} /> : null}
      <Navbar />
      <div className="app-container">
        {addSuccessMessage && (
          <div style={{ backgroundColor: "#d4edda", color: "#155724", padding: "10px", borderRadius: "4px", marginBottom: "1rem" }}>
            {addSuccessMessage}
          </div>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/foods"
            element={
              <ProtectedRoute>
                <div className="foods-wrapper">
                  {formIsShown
                    ?
                    <FoodForm setFormIsShown={setFormIsShown} userId={tokenId} />
                    :
                    isFormUpdated
                      ?
                      <UpdateFoodForm foodId={selectedFood._id} setIsFormUpdated={setIsFormUpdated} />
                      :
                      <>
                        <button onClick={handleClick} class="btn-add-food" >Add New Food</button>
                <FoodList todaysFood={todaysFood} setIsFormUpdated={setIsFormUpdated} isFormUpdated={isFormUpdated} setSelectedFood={setSelectedFood} foods={foods} setFood={setFood} userId={tokenId} handleAddFood={handleAddFood} setAddedFoodIds={setAddedFoodIds} addedFoodIds={addedFoodIds} getTodaysFoods={getTodaysFoods}/>                          </>
                  }

                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/foods-per-day"
            element={
              <ProtectedRoute>
<FoodPerDay tokenId={tokenId} todaysFood={todaysFood} handleDelete={handleDelete}/>                </ProtectedRoute>
            }
          />

          <Route
            path="/user-info/new"
            element={
              <ProtectedRoute>
                {tokenId ? <UserInfoForm tokenId={tokenId} /> : <div>Loading...</div>}
              </ProtectedRoute>
            }
          />

          <Route
            path="/user-info/edit/:userId"
            element={
              <ProtectedRoute>
                <UpdateUserInfoForm />
              </ProtectedRoute>
            }
          />

        </Routes>
      </div>
    </Router>

  )


}

export default App

