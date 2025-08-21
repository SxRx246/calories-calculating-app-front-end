import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FoodPerDay = ({ tokenId , handleDelete }) => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const baseURL = import.meta.env.VITE_BACK_END_SERVER_URL;
const getFoodsPerDay = async () => {
  try {
    const url = `${baseURL}/foods-per-day/${tokenId}`;
    const response = await axios.get(url);
    console.log("Foods per day data:", response.data);
    setFoods(response.data.foods || []);
  } catch (error) {
    console.error("Error fetching foods per day:", error);
  }
};

  useEffect(() => {
    if (!tokenId) return;
    getFoodsPerDay()
  }, [tokenId, baseURL]);

    const deleteAndRefresh = async (foodId) => {
    try {
      await handleDelete(foodId);  // call parent's delete function
      await getFoodsPerDay();          // refetch foods after delete
    } catch (err) {
      console.error("Failed to delete and refresh:", err);
    }
  };

  const totalCalories = foods.reduce((sum, item) => {
    return sum + (item.food?.calories || 0) * item.quantity;
  }, 0);

  if (loading) return <p>Loading today’s foods...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Foods Added Today:</h2>
      {foods.length > 0 ? (
        <>
          <ul>
            {foods.map(({ food, quantity }, index) => (
              <li key={index}>
                {food?.name || 'Unknown'} — Quantity: {quantity} — Calories per serving: {food?.calories || 0}
                <button onClick={() => deleteAndRefresh(food._id)}>Delete</button>
              </li>
            ))}
          </ul>
          <h3>Total Calories: {totalCalories}</h3>
        </>
      ) : (
        <p>No foods added yet.</p>
      )}
    </div>
  );
};

export default FoodPerDay;
