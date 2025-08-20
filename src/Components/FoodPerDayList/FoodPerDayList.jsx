import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FoodPerDay = ({ tokenId }) => {
    const [foodLog, setFoodLog] = useState([]);
    const [foodId, setFoodId] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchFoodLog();
    }, []);
    
    const baseURL = import.meta.env.VITE_BACK_END_SERVER_URL
    const fetchFoodLog = async () => {
        try {

            const response = await axios.get(`${baseURL}/foods-per-day/${tokenId}`);
            setFoodLog(response.data.foods || []);
        } catch (error) {
            console.error('Error fetching food log:', error);
        }
    };

    const handleAddFood = async () => {
        try {
            await axios.post(`${baseURL}/foods-per-day/new`, {
                userId: tokenId,
                foodId,
                quantity,
            });
            setMessage('Food added successfully!');
            fetchFoodLog();
        } catch (error) {
            console.error('Error adding food:', error);
            setMessage('Error adding food.');
        }
    };

    return (
        <div>
            <h2>Todays List</h2>
            {message && <p>{message}</p>}
            <ul>
                {foodLog.map(item => (
                    <li key={item.foodId}>{item.foodId} - Quantity: {item.quantity}</li>
                ))}
            </ul>
            <input
                type="text"
                placeholder="Food ID"
                value={foodId}
                onChange={e => setFoodId(e.target.value)}
            />
            <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
            />
            <button onClick={handleAddFood}>Add Food</button>
        </div>
    );
};

export default FoodPerDay;