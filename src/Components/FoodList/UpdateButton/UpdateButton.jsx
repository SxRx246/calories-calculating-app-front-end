import React, { useState } from 'react'

const UpdateButton = ({setIsFormUpdated}) => {
    const handleUpdateButton = () => {
        setIsFormUpdated(true) 
    }
  return (
    <div>
      <button onClick={handleUpdateButton}>Edit</button>
    </div>
  )
}

export default UpdateButton
