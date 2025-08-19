import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL


const createFood = async (data) => {
  try {
    const url = `${BASE_URL}/foods/new`
    const response = await axios.post(url, data, {
      headers: { "Content-Type": "multipart/form-data" }
    })
    console.log("response: " , response)
    return response
  } catch (error) {
    return error
  }
}


const deleteFood = async (id) => {
console.log("Deleting food with ID:", id);    try {
        const url = `${BASE_URL}/foods/${id}`
        const response = await axios.delete(url)
        return response
    }
    catch (error) {
        return error
    }
}

const updateFood = async (id, data) => {
    try {
        const url = `${BASE_URL}/foods/${id}`
        const response = await axios.put(url, data,  {
      headers: { "Content-Type": "multipart/form-data" }
    })
        return response
    }
    catch (error) {
        return error
    }
}


export {
    createFood,
    deleteFood,
    updateFood
}