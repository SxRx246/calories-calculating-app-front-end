import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../index.css';

const FoodPerDay = ({ tokenId, handleDelete }) => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const baseURL = import.meta.env.VITE_BACK_END_SERVER_URL;

  const getFoodsPerDay = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = `${baseURL}/foods-per-day/${tokenId}`;
      const response = await axios.get(url);
      console.log("Foods per day data:", response.data);
      setFoods(response.data.foods || []);
    } catch (error) {
      console.error("Error fetching foods per day:", error);
      setError('Failed to load foods.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!tokenId) return;
    getFoodsPerDay();
  }, [tokenId, baseURL]);

  const handleQuantityChange = (index, newQuantity) => {
    setFoods(prevFoods => {
      const updatedFoods = [...prevFoods];
      updatedFoods[index].quantity = Math.max(0, newQuantity); // prevent negative
      return updatedFoods;
    });
  };

  const deleteAndRefresh = async (foodId) => {
    if (!handleDelete) {
      console.error('handleDelete function is not provided!');
      return;
    }
    try {
      await handleDelete(foodId);  // call parent's delete function
      await getFoodsPerDay();      // refresh foods list
    } catch (err) {
      console.error("Failed to delete and refresh:", err);
      setError('Failed to delete the food item.');
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
            {foods.map(({ food, quantity }, i) => (
              <li key={i} className='card' style={{ marginBottom: '1rem' }}>
                {food?.name || 'Unknown'} — Quantity: 
                <input
                  type="number"
                  value={quantity}
                  min={0}
                  style={{ width: '60px', marginLeft: '10px', marginRight: '10px' }}
                  onChange={(e) => handleQuantityChange(i, parseInt(e.target.value) || 0)}
                /> 
                — Calories per serving: {food?.calories || 0}
                <button 
                  onClick={() => deleteAndRefresh(food._id)} 
                  style={{ marginLeft: '10px' }}
                >
                  Delete
                </button>
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
