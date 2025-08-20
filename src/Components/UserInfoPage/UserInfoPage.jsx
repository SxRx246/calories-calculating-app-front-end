import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { getUserInfoDetails } from '../../services/userInfoService'
import { jwtDecode } from 'jwt-decode'

const activityMultipliers = {
  sedentary: 1.2,
  lightly_active: 1.375,
  moderately_active: 1.55,
  very_active: 1.725,
  super_active: 1.9
};

const convertToMetric = (value, unit, type) => {
  if (type === "weight" && unit === "lb") return value * 0.453592;
  if (type === "height" && unit === "ft") return value * 30.48;
  return value;
};

const calculateCalories = ({ age, gender, height, weight, activityLevel }) => {
  const weightKg = convertToMetric(weight.value, weight.unit, "weight");
  const heightCm = convertToMetric(height.value, height.unit, "height");
  const ageNum = Number(age);

  let BMR = gender === "male"
    ? 10 * weightKg + 6.25 * heightCm - 5 * ageNum + 5
    : 10 * weightKg + 6.25 * heightCm - 5 * ageNum - 161;

  const multiplier = activityMultipliers[activityLevel] || 1.2;
  return Math.round(BMR * multiplier);
};

const UserInfoPage = ({tokenId}) => {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.userId || decodedToken._id || decodedToken.id; 

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [calories, setCalories] = useState(null);

  const fetchInfo = async () => {
    try {
      const response = await getUserInfoDetails(userId);
      setUserInfo(response.data);
      setCalories(calculateCalories(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleEdit = () => {
    if (userInfo && userInfo._id) {
      navigate(`/user-info/edit/${tokenId}`)
    }
  };

  if (!userInfo) return <p>Loading...</p>;

  return (
    <div>
      <h1>User Info Summary</h1>
      <p><strong>Age:</strong> {userInfo.age}</p>
      <p><strong>Gender:</strong> {userInfo.gender}</p>
      <p><strong>Height:</strong> {userInfo.height.value} {userInfo.height.unit}</p>
      <p><strong>Weight:</strong> {userInfo.weight.value} {userInfo.weight.unit}</p>
      <p><strong>Activity Level:</strong> {userInfo.activityLevel}</p>

      <hr />
      <h2>Required Daily Calories:</h2>
      <p><strong>{calories} kcal/day</strong></p>

      <button onClick={handleEdit}>Edit Info</button>
    </div>
  );
};

export default UserInfoPage;
