import axios from 'axios'
import React, { useState, useEffect } from 'react'
import DeleteButton from './DeleteButton/DeleteButton'
import UpdateButton from './UpdateButton/UpdateButton'
import Footer from '../Footer/Footer'

const FoodList = ({ setIsFormUpdated, isFormUpdated, setSelectedFood, foods, setFood, handleClick }) => {

    const baseURL = import.meta.env.VITE_BACK_END_SERVER_URL;

    const allFoods = async () => {
        try {
            const url = `${baseURL}/foods`;
            const response = await axios.get(url);
            setFood(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        allFoods();
    }, []);

    return (
        <>
            <div class="foods-header">
                <h2>Foods List</h2>
                <button class="btn-add-food" onClick={handleClick}>Add Food</button>
            </div>
            <div className='smallContainer'>
                {foods.length ? (
                    foods.map((food) => (
                        <div className='card' key={food._id}>
                            {food.picture ? (
                                <img
                                src={`${import.meta.env.VITE_BACK_END_SERVER_URL}${food.picture}`}
                                alt={food.name}
                                />
                            ) : (
                                <img
                                src={`${import.meta.env.VITE_BACK_END_SERVER_URL}/uploads/default_food.png`}
                                alt={food.name}
                                />
                            )}
                            <p>{food.name}</p>
                            <p>Calories: {food.calories}</p>
                            <DeleteButton allFoods={allFoods} id={food._id} />
                            <UpdateButton
                                allFoods={allFoods}
                                food={food}
                                setIsFormUpdated={setIsFormUpdated}
                                setSelectedFood={setSelectedFood}
                                className="edit-btn"
                            />
                        </div>
                    ))
                ) : (
                    <h2>No foods yet</h2>
                )}
            </div>
                <Footer />
        </>
    );
};

export default FoodList;
