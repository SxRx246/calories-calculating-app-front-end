import axios from "axios"
import { deleteFood } from "../../../services/foodService"


const DeleteButton = ({ id, allFoods }) => {
    const handleDelete = async () => {
        const response = await deleteFood(id)
        console.log("Delete response:", response);
        if (response.status === 200) {
            allFoods(); // Refresh the list if the delete was successful
        } else {
            console.error("Failed to delete:", response);
        }
    }
    return (
        <button onClick={handleDelete}>Delete</button>
    )
}

export default DeleteButton