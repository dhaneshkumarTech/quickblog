# Node.js Quick Blog Backend

## Overview
This project is a Node.js Express application designed as a quick backend solution for a blogging platform. The project leverages MongoDB as its database, and provides JWT-based authentication using Passport. The app supports three types of users: Admin, Consumer, and Creator. Data models for User, Blog, Comment, and Like are defined using Mongoose. All routes are validated using Joi validation middleware.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Joi for Validation
- Passport with JWT for Authentication

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory and run `npm install` to install all required dependencies.
3. Create a `.env` file in the project root to store your environment variables like `PORT`.
4. Run `npm start` to launch the server.

## Data Models

1. **User Model**: Contains fields such as name, email, password, role, etc.
2. **Blog Model**: Contains fields like title, content, userId, etc.
3. **Comment Model**: Holds the comment content, userId, and blogId.
4. **Like Model**: Keeps track of likes with userId and blogId.

## User Roles

1. **Admin**: Can view all users, and approve or reject 'creater' requests.
2. **Consumer**: Can read blogs and update their role to 'creater'.
3. **Creater**: Can write, edit and delete blogs.

## Routes Overview

### Admin Routes (`adminRoutes.js`)
- Get all users
- Update the status of all user requests
- Update the status of a specific user request

### User Routes (`userRoutes.js`)
- Register a new user
- Login
- Update password
- Update role to 'creater'

### Blog Routes (`blogRoutes.js`)
- Create a new blog
- Add a comment to a blog
- Like a blog
- Fetch all blogs or by specific user
- Delete a blog

## Middleware and Validation

- Joi validation is used for data validation in incoming requests.
- JWT-based authentication via Passport is implemented.

## Best Practices

1. **Security**: User passwords are hashed before storing them in the database.
2. **Data Validation**: All incoming data is validated server-side using Joi.
3. **Token Management**: JWT-based token management is implemented for secure API interactions.
4. **Modularization**: Code is broken down into routes, controllers, models, and middleware for better maintainability.

## Future Work

- Implement a rate-limiting mechanism to prevent abuse.
- Add more features such as social login and a more interactive frontend.

Feel free to fork, star, or contribute to this project. Happy coding! 🚀
