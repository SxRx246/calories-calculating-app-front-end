import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from "react";
import FoodList from "./Components/FoodList/FoodList";
import FoodForm from "./Components/FoodForm/FoodForm";
import UpdateFoodForm from "./Components/UpdateFoodForm/UpdateFoodForm";
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import LoginForm from './LoginForm';
import SignUp from './SignupForm';
import LogoutButton from './LogoutButton';
import Home from './Home';
import ProtectedRoute from './ProtectedRoutes';
import './App.css'
import NavBar from './Components/NavBar/NavBar';
import UserInfoForm from './Components/UserInfoForm/UserInfoForm';
import UserInfoPage from './Components/UserInfoPage/UserInfoPage';
import UpdateUserInfoForm from './Components/UpdateUserInfoForm/UpdateUserInfoForm';


const App = () => {
  const [formIsShown, setFormIsShown] = useState(false);
  const [isFormUpdated, setIsFormUpdated] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [foods, setFood] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [tokenId, setTokenId] = useState('');

  function handleLogin(newToken) {
    setToken(newToken);
  }

  function handleLogout() {
    setToken(null);
    localStorage.removeItem('token');
  }

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log('Decoded token in App.js:', decodedToken);
      setTokenId(decodedToken.id);
    }
  }, [token]);

  console.log('Token ID in App: ', tokenId);

  const handleClick = () => {
    setFormIsShown(true);
  };

  return (
    <Router>
      <div className="app-container">
        {token && <NavBar onLogout={handleLogout} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/foods"
            element={
              <ProtectedRoute>
                <div className="foods-wrapper">
                  {formIsShown ? (
                    <FoodForm setFormIsShown={setFormIsShown} />
                  ) : isFormUpdated ? (
                    <UpdateFoodForm
                      foodId={selectedFood._id}
                      setIsFormUpdated={setIsFormUpdated}
                    />
                  ) : (
                    <>
                      <FoodList
                        setIsFormUpdated={setIsFormUpdated}
                        isFormUpdated={isFormUpdated}
                        setSelectedFood={setSelectedFood}
                        foods={foods}
                        setFood={setFood}
                        handleClick={handleClick}
                      />
                    </>
                  )}
                </div>
              </ProtectedRoute>
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
            path="/user-info/view/:userId"
            element={
              <ProtectedRoute>
                <UserInfoPage />
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
  );
};

export default App;
