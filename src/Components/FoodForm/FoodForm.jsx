import { useState } from "react"
const FoodForm = () => {

  const [formData, setFormData] = useState({})

  const handleSubmit = async () => {
    const response = await create(formData)

  }

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }      
  return (
    <div className='form'>
      <h1>Add New Track</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <br />
        <input type="name" name="name" id="name" onChange={handleChange} value={formData.name} placeholder='Food Name ....' />
        <br />
        <label htmlFor="category">category</label>
        <br />
        <input type="category" name="category" id="category" onChange={handleChange} value={formData.category} placeholder='Food category ....' />
        <br />
        <label htmlFor="serving_qty">serving_qty</label>
        <br />
        <input type="serving_qty" name="serving_qty" id="serving_qty" onChange={handleChange} value={formData.serving_qty} placeholder='Food serving_qty ....' />
        <br />
        <label htmlFor="serving_size">serving_size</label>
        <br />
        <input type="serving_size" name="serving_size" id="serving_size" onChange={handleChange} value={formData.serving_size} placeholder='Food serving_size ....' />
        <br />

        <label htmlFor="calories">Calories</label>
        <br />

        <input type="calories" name="calories" id="calories" onChange={handleChange} value={formData.calories} placeholder='Food Calories....' />
        <br />
        <label htmlFor="picture">picture</label>
        <br />

        <input type="picture" name="picture" id="picture" onChange={handleChange} value={formData.picture} placeholder='Food picture....' />
        <br />

        <button id="SubmitButton" type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default FoodForm
