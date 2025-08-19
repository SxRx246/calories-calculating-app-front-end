import { useState } from "react";
import FoodList from "./Components/FoodList/FoodList"
import FoodForm from "./Components/FoodForm/FoodForm";

const App = () => {
  const [formIsShown, setFormIsShown] = useState(false)


  const handleClick = () => {
    setFormIsShown(true)
  }
  return (
    <>
      {formIsShown
        ?
        <FoodForm />
        :
        <>
          <button onClick={handleClick}>Add Food</button>
          <FoodList />
        </>
      }

    </>

  )


}

export default App

