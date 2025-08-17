import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL


const createFood = async (data) => {
    try {
        const url = `${BASE_URL}/foods`
        const response = await axios.post(url, data)
        return response
    }
    catch (error) {
        return error
    }
}


const deleteFood = async (id) => {
    try {
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
        const response = await axios.put(url, data)
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