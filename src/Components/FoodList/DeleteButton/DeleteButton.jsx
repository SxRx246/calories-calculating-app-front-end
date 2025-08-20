import axios from 'axios';

const DeleteButton = ({ id, allFoods }) => {
  const baseURL = import.meta.env.VITE_BACK_END_SERVER_URL;

  const handleDelete = async () => {
    try {
      await axios.delete(`${baseURL}/foods/${id}`);
      allFoods();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button onClick={handleDelete} className="delete-btn">
      Delete
    </button>
  );
};

export default DeleteButton;
