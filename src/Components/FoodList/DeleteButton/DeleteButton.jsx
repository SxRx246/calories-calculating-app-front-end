import axios from "axios"
import { deleteFood } from "../../../Services/foodService"


const DeleteButton = ({ id, allFoods, handleDeleteTrack }) => {
    const handleDelete = async () => {
        const response = await deleteFood(id)
        allFoods()
    }
    return (
        <button onClick={handleDelete}>Delete</button>
    )
}

export default DeleteButton