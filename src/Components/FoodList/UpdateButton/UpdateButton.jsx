import React, { useState } from 'react'

const UpdateButton = ({setIsFormUpdated, setSelectedFood, food}) => {
    const handleUpdateButton = () => {
        setIsFormUpdated(true) 
        setSelectedFood(food)
    }
  return (
    <div>
      <button onClick={handleUpdateButton} className="edit-btn">Edit</button>
    </div>
  )
}

export default UpdateButton
