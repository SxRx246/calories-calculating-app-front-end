import axios from "axios";

<<<<<<< HEAD
const BASE_URL = import.meta.env.VITE_BACKEND_URL
=======
const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL
>>>>>>> dc9b610e0f57d991cb446e8148973b069f7ebd15


const createFood = async (data) => {
  try {
    const url = `${BASE_URL}/foods/new`
    const response = await axios.post(url, data, {
      headers: { "Content-Type": "multipart/form-data" }
    })
<<<<<<< HEAD
    console.log("response: " , response)
=======
>>>>>>> dc9b610e0f57d991cb446e8148973b069f7ebd15
    return response
  } catch (error) {
    return error
  }
}


const deleteFood = async (id) => {
<<<<<<< HEAD
console.log("Deleting food with ID:", id);    try {
=======
    try {
>>>>>>> dc9b610e0f57d991cb446e8148973b069f7ebd15
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