import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL


const createUserInfo = async (data) => {
  try {
    const token = localStorage.getItem('token');
    const url = `${BASE_URL}/user-info/new`

    const response = await axios.post(url, data, {
      headers: { Authorization: `Bearer ${token}` }
    })

    return response
  } catch (error) {
    console.log("createUserInfo error:", error)
    return error
  }
};




const updateUserInfo = async (id, data) => {
    try {
        const url = `${BASE_URL}/user-info/${id}`
        const response = await axios.put(url, data)
        return response
    }
    catch (error) {
        return error
    }
}


const getUserInfoDetails = async (id) => {
    try {
        console.log('This is User ID in js: ', id)
        const url = `${BASE_URL}/user-info/${id}`
        console.log(url)
        const response = await axios.get(url)
        return response
    }
    catch (error) {
        return error
    }
}


export {
    createUserInfo,
    updateUserInfo,
    getUserInfoDetails
}