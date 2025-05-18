# 🎓 Course Selling App - Backend

This is the backend API for a Course Selling application. It provides functionalities for user authentication, course management, purchase handling, and admin controls.

## 🚀 Features

- User registration and login (JWT-based authentication)
- Admin panel for managing courses
- Browse and purchase courses
- Secure RESTful API using Express.js
- MongoDB integration with Mongoose

## 🛠️ Tech Stack

- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **bcrypt** for password hashing
- **dotenv** for environment configuration

## 📁 Project Structure

### course-selling-backend/

- ├── controllers/ # Business logic
- ├── middleware/ # Auth and other middlewares
- ├── models/ # Mongoose models
- ├── routes/ # API route definitions
- ├── config/ # DB config
- ├── .env # Environment variables
- ├── app.js # Express app entry point
- └── server.js # Server bootstrap



## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/course-selling-backend.git
   cd course-selling-backend

2. Install dependencies:
    ```bash
    npm install

3. Configure environment variables in a .env file:
        
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/courseapp
    JWT_SECRET=your_jwt_secret

4. Run the server:
    ```bash
    npm start