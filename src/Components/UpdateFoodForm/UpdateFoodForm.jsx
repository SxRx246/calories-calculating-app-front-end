import React, { useState, useEffect } from "react";
import { updateFood } from "../../services/foodService";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const UpdateFoodForm = ({ foodId,setIsFormUpdated }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    serving_qty: "",
    serving_size: "",
    calories: "",
    picture: null
  })


  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/foods/${foodId}`);
        const food = response.data;

        setFormData({
          name: food.name || "",
          category: food.category || "",
          serving_qty: food.serving_qty || "",
          serving_size: food.serving_size || "",
          calories: food.calories || "",
          picture: null
        })
      } catch (error) {
        console.error("Error fetching food:", error);
      }
    };

    fetchFood()
  }, [foodId])


  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  };


  const handleFileChange = (event) => {
    setFormData({ ...formData, picture: event.target.files[0] });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await updateFood(foodId, formData);
      
      if (response.status === 200) {
        setIsFormUpdated(false)
        console.log("Food updated:", response.data);
      } else {
        console.error("Failed to update:", response);
      }
    } catch (error) {
      console.error("Error updating food:", error);
    }
  };

  return (
    <div className="form">
      <h1>Update Food</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Food Name</label><br />
        <input
          type="text"
          name="name"
          id="name"
          onChange={handleChange}
          value={formData.name}
          required
        /><br />

        <label htmlFor="category">Category</label><br />
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
        </select><br />

        <label htmlFor="serving_qty">Serving Quantity</label><br />
        <input
          type="number"
          name="serving_qty"
          id="serving_qty"
          onChange={handleChange}
          value={formData.serving_qty}
          required
        /><br />

        <label htmlFor="serving_size">Serving Size</label><br />
        <input
          type="number"
          name="serving_size"
          id="serving_size"
          onChange={handleChange}
          value={formData.serving_size}
          required
        /><br />

        <label htmlFor="calories">Calories</label><br />
        <input
          type="number"
          name="calories"
          id="calories"
          onChange={handleChange}
          value={formData.calories}
          required
        /><br />

        <label htmlFor="picture">Picture</label><br />
        <input
          type="file"
          name="picture"
          id="picture"
          accept="image/*"
          onChange={handleFileChange}
        /><br />

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateFoodForm;
