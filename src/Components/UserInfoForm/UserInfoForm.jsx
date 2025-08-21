import React, { useState } from "react";
import { createUserInfo } from "../../services/userInfoService";
import { useNavigate } from "react-router";
import Footer from "../Footer/Footer";

const UserInfoForm = ({ tokenId }) => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: { value: "", unit: "cm" },
    weight: { value: "", unit: "kg" },
    activityLevel: "",
  });

  const [message, setMessage] = useState("")
  const navigate = useNavigate();
  console.log('ID inside user Info Form: ', tokenId)

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleNestedChange = (event, field) => {
    setFormData({
      ...formData,
      [field]: {
        ...formData[field],
        [event.target.name]: event.target.value,
      },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { age, gender, height, weight, activityLevel } = formData;

    if (
      !age || age < 1 ||
      !height.value || height.value < 1 ||
      !weight.value || weight.value < 1 ||
      !gender || !activityLevel
    ) {
      setMessage("Please fill all fields with valid values (1 or more).");
      return
    }

    try {
      const response = await createUserInfo({
        ...formData,
        userId: tokenId,
      })

      if (!response || !response.data) {
        setMessage("Failed to save user information.")
        return;
      }

      setMessage(""); 
      navigate(`/user-info/view/${tokenId}`, {
        state: response.data,
      })

    } catch (error) {
      console.log("Error saving user info:", error)

      setMessage("An error occurred while saving user info.")
    }
  }

  return (
    <div className="form">
      <h1>User Information</h1>

      {message && <p className="form-message">{message}</p>}

      <form onSubmit={handleSubmit}>

        <label>Age</label><br />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          min="1"
          required
        /><br />

        <label>Gender</label><br />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Gender --</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select><br />

        <label>Height</label><br />
        <div className="input-with-unit">
          <input
            type="number"
            name="value"
            value={formData.height.value}
            onChange={(event) => handleNestedChange(event, "height")}
            min="1"
            required
          />
          <select
            name="unit"
            value={formData.height.unit}
            onChange={(event) => handleNestedChange(event, "height")}
          >
            <option value="cm">cm</option>
            <option value="ft">ft</option>
          </select>
        </div>

        <label>Weight</label><br />
        <div className="input-with-unit">
          <input
            type="number"
            name="value"
            value={formData.weight.value}
            onChange={(event) => handleNestedChange(event, "weight")}
            min="1"
            required
          />
          <select
            name="unit"
            value={formData.weight.unit}
            onChange={(event) => handleNestedChange(event, "weight")}
          >
            <option value="kg">kg</option>
            <option value="lb">lb</option>
          </select>
        </div>

        <label>Activity Level</label><br />
        <select
          name="activityLevel"
          value={formData.activityLevel}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Activity Level --</option>
          <option value="sedentary">Sedentary (little/no exercise)</option>
          <option value="lightly_active">Lightly Active (1-3 days/week)</option>
          <option value="moderately_active">Moderately Active (3-5 days/week)</option>
          <option value="very_active">Very Active (6-7 days/week)</option>
          <option value="super_active">Super Active (intense training)</option>
        </select><br />

        {/* <button type="submit">Save Info</button> */}
        <button type="submit" disabled={!tokenId}>Save Info</button>
      </form>
      <Footer />
    </div>
  );
};

export default UserInfoForm;
