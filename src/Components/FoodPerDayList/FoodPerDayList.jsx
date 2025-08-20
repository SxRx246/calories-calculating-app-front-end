import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FoodPerDay = ({ tokenId, todaysFood }) => {
    console.log("The tokenId in the FoodPerDay page" , tokenId)
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


    return (
                   <div>
                <h2>Selected Foods for the Day:</h2>
                {todaysFood.length ? (
                    todaysFood.map((food, index) => (
                        <div key={index}>
                            <p>{food.name} - Calories: {food.calories}</p>
                        </div>
                    ))
                ) : (
                    <p>No foods selected yet.</p>
                )}
            </div>
    );
};

export default FoodPerDay;