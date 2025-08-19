<<<<<<< HEAD
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

=======
import { useState } from 'react'
import './App.css'
import FoodForm from './Components/FoodForm/FoodForm'

const App = () => {
  return (
    <>
      <FoodForm />
>>>>>>> dc9b610e0f57d991cb446e8148973b069f7ebd15
    </>

  )


}

export default App

