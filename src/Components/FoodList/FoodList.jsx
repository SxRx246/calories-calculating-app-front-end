import axios from 'axios'
import React, { useState, useEffect } from 'react'
import DeleteButton from './DeleteButton/DeleteButton'
import UpdateButton from './UpdateButton/UpdateButton'

const FoodList = ({setIsFormUpdated , isFormUpdated , setSelectedFood, foods , setFood}) => {

    const baseURL = import.meta.env.VITE_BACK_END_SERVER_URL
    const allFoods = async () => {
        try{
            console.log(baseURL)
        const url = `${baseURL}/foods`
        const response = await axios.get(url)
        console.log("data: ",response.data)
        setFood(response.data)
        // console.log(foods)
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        allFoods()
    }, [])

console.log("Current foods:", foods);

    return (
        
        <>
            <h1>Foods List</h1>
            <div className='smallContainer'>
                {
                    foods.length
                        ?
                        foods.map((food, index) => {
                            return (
                                <div className='card' key={food._id}>

                                    <p>{index+1}</p>
                                    <p>Name: {food.name}</p>
                                    <p>Calories: {food.calories}</p>
                                    < DeleteButton allFoods={allFoods} id={food._id}/>
                                    < UpdateButton allFoods={allFoods} food={food} setIsFormUpdated={setIsFormUpdated} setSelectedFood={setSelectedFood}/>
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
