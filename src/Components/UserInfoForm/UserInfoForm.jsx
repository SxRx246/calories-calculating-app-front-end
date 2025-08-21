import React, { useState, useEffect } from "react";
import { createUserInfo } from "../../services/userInfoService";

const UserInfoForm = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: { value: "", unit: "cm" },
    weight: { value: "", unit: "kg" },
    activityLevel: ""
  });

  const [calories, setCalories] = useState(null);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleNestedChange = (event, field) => {
    setFormData({
      ...formData,
      [field]: {
        ...formData[field],
        [event.target.name]: event.target.value
      }
    });
  };

 
  const heightInCm = () => {
    const heightValue = parseFloat(formData.height.value);
    if (isNaN(heightValue)) return 0;
    if (formData.height.unit === "cm") return heightValue;
    if (formData.height.unit === "ft") return heightValue * 30.48; // 1 ft = 30.48 cm
    return 0;
  };


  const weightInKg = () => {
    const weightValue = parseFloat(formData.weight.value);
    if (isNaN(weightValue)) return 0;
    if (formData.weight.unit === "kg") return weightValue;
    if (formData.weight.unit === "lb") return weightValue * 0.453592; // 1 lb = 0.453592 kg
    return 0;
  };


  const calculateBMR = () => {
    const age = parseInt(formData.age);
    const weight = weightInKg();
    const height = heightInCm();
    const gender = formData.gender;

    if (!age || !weight || !height || !gender) return 0;

    if (gender === "male") {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === "female") {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
    return 0;
  };


  const activityFactor = () => {
    switch (formData.activityLevel) {
      case "sedentary":
        return 1.2;
      case "lightly_active":
        return 1.375;
      case "moderately_active":
        return 1.55;
      case "very_active":
        return 1.725;
      case "super_active":
        return 1.9;
      default:
        return 1;
    }
  };


  useEffect(() => {
    const bmr = calculateBMR();
    if (bmr) {
      const totalCalories = bmr * activityFactor();
      setCalories(totalCalories.toFixed(0)); 
    } else {
      setCalories(null);
    }
  }, [formData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await createUserInfo(formData);
      console.log("User info saved:", response.data);
    } catch (error) {
      console.error("Error saving user info:", error);
    }
  };

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

        <button type="submit">Save Info</button>
      </form>

      {calories && (
        <div style={{ marginTop: "20px", fontWeight: "bold" }}>
          Estimated Total Required Calories: {calories} kcal/day
        </div>
      )}
    </div>
  );
};

export default UserInfoForm;
