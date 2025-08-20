import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FoodPerDay = ({ tokenId }) => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const baseURL = import.meta.env.VITE_BACK_END_SERVER_URL;

  useEffect(() => {
    if (!tokenId) return;

    const getFoods = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${baseURL}/foods-per-day/${tokenId}`);
        setFoods(response.data.foods || []);
      } catch (err) {
        setError('Could not load today’s foods.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getFoods();
  }, [tokenId, baseURL]);

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
              <li key={i}>
                {food?.name || 'Unknown'} — Quantity: {quantity} — Calories per serving: {food?.calories || 0}
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
