import React, { useState } from "react"
import { createUserInfo } from "../../services/userInfoService"

const UserInfoForm = ({tokenId}) => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: { value: "", unit: "cm" },
    weight: { value: "", unit: "kg" },
    activityLevel: ""
  })

  console.log('ID inside user Info Form: ', tokenId)

  const handleChange = (event) => {
    setFormData({...formData,[event.target.name]: event.target.value})
  }

 
  const handleNestedChange = (event, field) => {
    setFormData({...formData,[field]: {
        ...formData[field],
        [event.target.name]: event.target.value
      }
    })
  }

const handleSubmit = async (event) => {
  event.preventDefault();
  const token = localStorage.getItem('token')
  console.log(tokenId)


  if (!tokenId) {
    alert("User ID not available. Please log in again.");
    return;
  }

  const dataToSend = {
    ...formData,
    userId: tokenId, // include the userId
  };
  console.log
  try {
    const response = await createUserInfo(dataToSend);
    console.log("User info saved:", response.data);
  } catch (error) {
    console.error("Error saving user info:", error);
  }
}

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await createUserInfo(formData)
//       console.log("User info saved:", response.data)
//     } catch (error) {
//       console.error("Error saving user info:", error)
//     }
//   }

  return (
    <div className="form">
      <h1>User Information</h1>
      <form onSubmit={handleSubmit}>
        
        <label>Age</label><br />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
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
        <input
          type="number"
          name="value"
          value={formData.height.value}
          onChange={(event) => handleNestedChange(event, "height")}
          required
        />
        <select
          name="unit"
          value={formData.height.unit}
          onChange={(event) => handleNestedChange(event, "height")}
        >
          <option value="cm">cm</option>
          <option value="ft">ft</option>
        </select><br />

        <label>Weight</label><br />
        <input
          type="number"
          name="value"
          value={formData.weight.value}
          onChange={(event) => handleNestedChange(event, "weight")}
          required
        />
        <select
          name="unit"
          value={formData.weight.unit}
          onChange={(event) => handleNestedChange(event, "weight")}
        >
          <option value="kg">kg</option>
          <option value="lb">lb</option>
        </select><br />

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
    </div>
  );
};

export default UserInfoForm;
