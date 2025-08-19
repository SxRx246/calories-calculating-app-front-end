import axios from 'axios'
import React, { useState, useEffect } from 'react'
import DeleteButton from './DeleteButton/DeleteButton'

const FoodList = () => {
    const [foods, setFood] = useState([])

    const baseURL = import.meta.env.VITE_BACKEND_URL
    const allFoods = async () => {
        try{
        const url = `${baseURL}/foods`
        const response = await axios.get(url)
        setFood(response.data)
        console.log(foods)
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        allFoods()
    }, [])



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
