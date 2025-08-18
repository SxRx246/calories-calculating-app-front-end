import axios from 'axios'

const baseURL = import.meta.env.VITE_BACKEND_URL

const create = async (data) => {
    const  url = `${baseURL}/foods/new`
    const response = await axios.post(url , data)
    return response
}
const update = async (data , id) => {
    const  url = `${baseURL}/foods/${id}`
    const response = await axios.put(url , data)
    return response.data
}

const deleteFood = async (id) =>{
    const url = `${baseURL}/foods/${id}`
    const response = await axios.delete(url)    
}

export {
    create,
    deleteFood,
    update
}