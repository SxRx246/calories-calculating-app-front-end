import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL


const deleteFoodFromDay = async (userId, foodId) => {
  try {
    const url = `${BASE_URL}/foods-per-day/${userId}/food/${foodId}`;
    const response = await axios.delete(url);
    return response;
  } catch (error) {
    console.error('Error deleting food from day:', error);
    return error;
  }
};

export {
  createFood,
  deleteFood,
  updateFood
}