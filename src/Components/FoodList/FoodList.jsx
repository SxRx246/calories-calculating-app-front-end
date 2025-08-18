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

                                    <p style={{ display: 'inline' }}>{index+1}</p> <br/>
                                    <p style={{ display: 'inline' }}>Name: {food.name}</p><br/>
                                    <p style={{ display: 'inline' }}>Picture{food.picture}</p>
                                    < DeleteButton />
                                    {/* <p style={{ display: 'inline' }}>{food.name}</p> */}

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
