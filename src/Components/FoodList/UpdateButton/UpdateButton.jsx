const UpdateButton = ({ food, setIsFormUpdated, setSelectedFood, className }) => {
  const handleUpdate = () => {
    setSelectedFood(food);
    setIsFormUpdated(true);
  };

  return (
    <button onClick={handleUpdate} className="edit-btn">
      Edit
    </button>
  );
};

export default UpdateButton;
