import axios from 'axios'
import React, { useState, useEffect } from 'react'
import DeleteButton from './DeleteButton/DeleteButton'
import UpdateButton from './UpdateButton/UpdateButton'

const FoodList = ({ setIsFormUpdated, isFormUpdated, setSelectedFood, foods, setFood, userId, handleAddFood }) => {
const [quantities, setQuantities] = useState({});

    const baseURL = import.meta.env.VITE_BACK_END_SERVER_URL
    const allFoods = async () => {
        try {
            console.log(baseURL)
            const url = `${baseURL}/foods`
            const response = await axios.get(url)
            console.log("data: ", response.data)
            setFood(response.data)
            // console.log(foods)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        allFoods()
    }, [])

    console.log("Current foods:", foods);

    const handleQuantityChange = (foodId, value) => {
        setQuantities(prev => ({
            ...prev,
            [foodId]: value
        }));
    };


    return (

        <>
            <h1>Foods List</h1>
            <div className='smallContainer'>
                {
                    foods.length
                        ?
                        foods.map((food) => {
                            return (
                                <div className='card' key={food._id}>
                                    {
                                        food.picture
                                            ?
                                            <img src={`${import.meta.env.VITE_BACK_END_SERVER_URL}${food.picture}`}
                                                alt={food.name}
                                                style={{ width: "200px", height: "auto", borderRadius: "8px" }}
                                            />
                                            :
                                            <img src={`${import.meta.env.VITE_BACK_END_SERVER_URL}/uploads/default_food.png`}
                                                alt={food.name}
                                                style={{ width: "200px", height: "auto", borderRadius: "8px" }}
                                            />
                                    }

                                    <p>{food.name}</p>
                                    <p>Calories Per Serving: {food.calories}</p>
                                    <input
                                        type="number"
                                        min="1"
                                        value={quantities[food._id] || 1}   // default to 1 if not set
                                        onChange={(e) => handleQuantityChange(food._id, Number(e.target.value))}
                                        style={{ width: "60px", marginRight: "10px" }}
                                    />
                                    <button onClick={() => handleAddFood(food._id, quantities[food._id] || 1 , food.name)}>
                                        Add to Todays List
                                    </button>                                  {
                                        food.userId && food.userId._id === userId
                                            ?
                                            <>
                                                < DeleteButton allFoods={allFoods} id={food._id} />
                                                < UpdateButton allFoods={allFoods} food={food} setIsFormUpdated={setIsFormUpdated} setSelectedFood={setSelectedFood} />
                                            </>
                                            :
                                            null

                                        // console.log("user loged in: ",userId)

                                    }

                                </div>
                            )
                        })

                        :
                        <h2>no foods yet</h2>

                }
            </div>

        </>
    )
}

export default FoodList
