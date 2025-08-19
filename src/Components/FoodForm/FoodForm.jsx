import React, { useState } from "react";
import { createFood } from "../../services/foodService";


const FoodForm = ({setFormIsShown}) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    serving_qty: "",
    serving_size: "",
    calories: "",
    picture: null
  })


  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleFileChange = (event) => {
    setFormData({ ...formData, picture: event.target.files[0] })
  }


   const handleSubmit = async (event) => {
    event.preventDefault()
    try { 
      const response = await createFood(formData)
      console.log("Food created:", response.data)
    } catch (error) {
      console.log(error)
    }
    setFormIsShown(false)
  }


  return (
    <div className="form">
      <h1>Add New Food</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Food Name</label>
        <br />
        <input
          type="text"
          name="name"
          id="name"
          onChange={handleChange}
          value={formData.name}
          required
        />
        <br />


        <label htmlFor="category">Category</label>
        <br />
        <select
          name="category"
          id="category"
          onChange={handleChange}
          value={formData.category}
          required
        >
          <option value="">-- Select Category --</option>
          <option value="Fruits">Fruits</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Grains & Cereals">Grains & Cereals</option>
          <option value="Legumes & Beans">Legumes & Beans</option>
          <option value="Nuts & Seeds">Nuts & Seeds</option>
          <option value="Dairy & Eggs">Dairy & Eggs</option>
          <option value="Meat & Poultry">Meat & Poultry</option>
          <option value="Fish & Seafood">Fish & Seafood</option>
          <option value="Oils & Fats">Oils & Fats</option>
          <option value="Snacks & Sweets">Snacks & Sweets</option>
          <option value="Beverages">Beverages</option>
          <option value="Soups & Sauces">Soups & Sauces</option>
          <option value="Fast Food / Restaurant Food">Fast Food / Restaurant Food</option>
          <option value="Branded Products">Branded Products</option>

        </select>
        <br />


        <label htmlFor="serving_qty">Serving Quantity</label>
        <br />
        <input
          type="number"
          name="serving_qty"
          id="serving_qty"
          onChange={handleChange}
          value={formData.serving_qty}
          required
        />
        <br />


        <label htmlFor="serving_size">Serving Size</label>
        <br />
        <input
          type="number"
          name="serving_size"
          id="serving_size"
          onChange={handleChange}
          value={formData.serving_size}
          required
        />
        <br />

        <label htmlFor="calories">Calories</label>
        <br />
        <input
          type="number"
          name="calories"
          id="calories"
          onChange={handleChange}
          value={formData.calories}
          required
        />
        <br />

  
        <label htmlFor="picture">Picture</label><br />
        <input
          type="file"
          name="picture"
          id="picture"
          accept="image/*"
         onChange={handleFileChange}
        /><br />

        <button id="SubmitButton" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FoodForm;
