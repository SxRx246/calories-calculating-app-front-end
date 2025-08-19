import { useState } from "react";
import FoodList from "./Components/FoodList/FoodList"
import FoodForm from "./Components/FoodForm/FoodForm"
import UpdateFoodForm from "./Components/UpdateFoodForm/UpdateFoodForm"


const App = () => {
  const [formIsShown, setFormIsShown] = useState(false)
  const [isFormUpdated , setIsFormUpdated] = useState(false)
  const [selectedFood , setSelectedFood] = useState(null)

  const handleClick = () => {
    setFormIsShown(true)
  }
  return (
    <>
      {formIsShown
        ?
        <FoodForm setFormIsShown ={setFormIsShown}/>
        :
        isFormUpdated
        ?
        <UpdateFoodForm foodId={selectedFood._id}/>
        :
        <>
          <button onClick={handleClick}>Add Food</button>
          <FoodList setIsFormUpdated={setIsFormUpdated} isFormUpdated={isFormUpdated} setSelectedFood={setSelectedFood}/>
        </>
      }

    </>

  )


}

export default App

