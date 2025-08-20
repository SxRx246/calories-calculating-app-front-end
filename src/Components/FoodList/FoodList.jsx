import axios from 'axios'
import React, { useState, useEffect } from 'react'
import DeleteButton from './DeleteButton/DeleteButton'
import UpdateButton from './UpdateButton/UpdateButton'

const FoodList = ({ setIsFormUpdated, isFormUpdated, setSelectedFood, foods, setFood, handleClick }) => {

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

    return (

        <>
            <div class="foods-header">
                <h2>Foods List</h2>
                <button class="btn-add-food" onClick={handleClick}>Add Food</button>
            </div>
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
                                    <p>Calories: {food.calories}</p>
                                    < DeleteButton allFoods={allFoods} id={food._id} />
                                    < UpdateButton allFoods={allFoods} food={food} setIsFormUpdated={setIsFormUpdated} setSelectedFood={setSelectedFood} />
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
