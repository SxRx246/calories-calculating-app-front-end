# Sip & Skip - Food Tracking Application

## Overview

**Sip & Skip** is a React-based food tracking web application that allows users to manage their daily food intake. Users can view, add, update, and delete food items, track quantities, and monitor total calorie consumption. The app includes authentication features for sign-up and login, providing personalized food management.

---

## Features

- User authentication: Sign up and login functionality.
- View a list of foods with pictures, categories, calories, and quantities.
- Add foods to the daily food list with specified quantities.
- Update or delete foods (only for foods created by the logged-in user).
- Track total calories consumed based on daily food quantities.
- **Calorie Calculator:** Helps users calculate their required daily calories so they can manage their intake effectively.
- Responsive and styled UI components including a footer and logo.
- File upload support for food images.
- Real-time quantity adjustments and calorie calculations.

---

## Technologies Used

- **Frontend:** React, Axios, React Router
- **Backend:** Node.js (assumed from endpoints), REST API
- **Styling:** CSS Modules, plain CSS
- **Authentication:** JWT token stored in localStorage
- **Image Handling:** File uploads in food creation

---

## Project Structure

```

src/
├── components/
│   ├── FoodForm.jsx         # Form to add new food
│   ├── FoodList.jsx         # Displays all foods with add/edit/delete options
│   ├── FoodPerDay.jsx       # Displays foods added today with quantity and calories
│   ├── Footer.jsx           # Footer component
│   ├── UpdateButton.jsx     # Button to trigger food update
│   ├── DeleteButton.jsx     # Button to delete food item
│   ├── LoginForm.jsx        # Login form component
│   ├── SignUp.jsx           # Signup form component
│   ├── LogoutButton.jsx     # Logout button component
│   └── Logo.css             # Logo styling
├── services/
│   └── foodService.js       # API calls for food CRUD operations
├── styles/
│   ├── Footer.css           # Footer styling
│   ├── Auth.css             # Login/signup form styling
│   └── logo.css             # Logo styling
├── App.jsx                  # Main app routing and state management
└── index.jsx                # Entry point

```

---

## Usage

- **Sign Up / Login**

Create an account or log in using the forms.

- **View Foods**

Browse the food list, see calories and images.

- **Add Foods**

Adjust quantity and add foods to your daily list.

- **Track Daily Intake**

View daily foods added with quantities and total calories.

- **Calorie Calculator**

Calculate your daily required calories to better manage your food intake goals.

- **Edit / Delete**

Edit or delete foods you have created.

- **Logout**

Use the logout button to end your session.

---

## Code Highlights

- **FoodPerDay.jsx**

  Fetches foods added by the logged-in user for the day, allows quantity adjustment and deletion, and calculates total calories.

- **FoodList.jsx**

  Lists all available foods, supports adding to daily intake, and conditionally shows edit/delete buttons if the food belongs to the logged-in user.

- **FoodForm.jsx**

  Form to create new food entries with image upload and category selection.

- **Authentication**

  Login and signup components with form validation and error handling. JWT token saved in localStorage for session management.

- **Calorie Calculator**

  A utility to calculate the user's daily calorie requirements to guide food intake.

---

## Notes

- The backend endpoints (`/foods`, `/foods-per-day/:tokenId`, `/auth/signup`, `/auth/login`, etc.) are assumed based on your frontend code and should be implemented accordingly.
- Image uploads in `FoodForm` assume backend support for multipart/form-data.
- Quantity inputs prevent negative values and default to sensible defaults.
- Environment variables are used to configure backend URLs, adjust them to your deployment environment.

---

## Future Improvements

- Add form validation feedback.
- Improve error handling and user notifications.
- Add pagination or search for the food list.
- Add user profile management.
- Support editing daily quantities with API persistence.
- Enhance UI/UX with more animations and responsive design.



If you want, I can help generate a more specific README section for the calorie calculator or help with anything else!
