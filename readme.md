

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Setup and Installation](#setup-and-installation)
4. [Environment Variables](#environment-variables)
5. [API Documentation](#api-documentation)
    - [Authentication Routes](#authentication-routes)
    - [Admin Routes](#admin-routes)
    - [Loan Routes](#loan-routes)
6. [Middleware](#middleware)
7. [Error Handling](#error-handling)
8. [Contributing](#contributing)
9. [License](#license)

## Project Overview

This project is a backend application built with Typescript, Node.js and Express, designed to manage users and loan applications. It provides functionalities for user registration, login, loan creation, and administration of user roles, including verification and management of loans.

## Tech Stack

- **Node.js**: JavaScript runtime built on Chrome's V8 engine.
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: NoSQL database for storing user and loan information.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JSON Web Tokens (JWT)**: For user authentication and authorization.
- **Bcrypt.js**: For password hashing.

## Setup and Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AnandPTi/loan-management-backend.git
   cd loan-management-backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the application**:
   ```bash
   npm start
   ```

4. **Access the application**:
   Open your browser and navigate to `http://localhost:5000` (or the port specified in your environment).

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```
MONGODB_URI=mongodb://localhost:27017/your-db-name
JWT_SECRET=your_jwt_secret
PORT=5000
```

## API Documentation

### Authentication Routes

#### Register User
- **Endpoint**: `POST /api/auth/register`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "name": "John Doe",
    "phone": "1234567890",
    "address": "123 Street, City, Country",
    "password": "password123"
  }
  ```
- **Response**:
  - **201 Created**: User registered successfully.
  - **400 Bad Request**: All fields are required or user already exists.
  - **500 Internal Server Error**: Registration failed.

#### Login User
- **Endpoint**: `POST /api/auth/login`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  - **200 OK**: Returns user details and token.
  - **401 Unauthorized**: Invalid email or password.
  - **500 Internal Server Error**: Login failed.

#### Get User Profile
- **Endpoint**: `GET /api/auth/profile`
- **Authorization**: Bearer token required.
- **Response**:
  - **200 OK**: Returns user profile details.
  - **404 Not Found**: User not found.
  - **500 Internal Server Error**: Failed to get user profile.

### Admin Routes

#### Create Verifier
- **Endpoint**: `POST /api/admin/create-verifier`
- **Authorization**: Admin role required.
- **Request Body**:
  ```json
  {
    "email": "verifier@example.com",
    "name": "Verifier Name",
    "phone": "0987654321",
    "address": "456 Avenue, City, Country",
    "password": "password123"
  }
  ```
- **Response**:
  - **201 Created**: Verifier created successfully.
  - **400 Bad Request**: All fields are required or verifier already exists.
  - **500 Internal Server Error**: Creation failed.

#### Delete User
- **Endpoint**: `DELETE /api/admin/delete-user/:userId`
- **Authorization**: Admin role required.
- **Response**:
  - **204 No Content**: User deleted successfully.
  - **404 Not Found**: User not found.
  - **500 Internal Server Error**: Deletion failed.

#### Get All Users
- **Endpoint**: `GET /api/admin/users`
- **Authorization**: Admin role required.
- **Response**:
  - **200 OK**: Returns a list of all users.
  - **500 Internal Server Error**: Failed to retrieve users.

### Loan Routes

#### Create Loan
- **Endpoint**: `POST /api/loans/create`
- **Authorization**: User role required.
- **Request Body**:
  ```json
  {
    "amount": 10000,
    "term": 12,
    "purpose": "Personal expenses"
  }
  ```
- **Response**:
  - **201 Created**: Loan created successfully.
  - **400 Bad Request**: Invalid loan data.
  - **500 Internal Server Error**: Creation failed.

#### Get User Loans
- **Endpoint**: `GET /api/loans/user/loans`
- **Authorization**: User role required.
- **Response**:
  - **200 OK**: Returns user's loans.
  - **500 Internal Server Error**: Failed to retrieve loans.

#### Get Verifier Loans
- **Endpoint**: `GET /api/loans/verifier/loans`
- **Authorization**: Verifier role required.
- **Response**:
  - **200 OK**: Returns loans assigned to the verifier.
  - **500 Internal Server Error**: Failed to retrieve loans.

#### Update Loan Status
- **Endpoint**: `PUT /api/loans/verifier/update-status`
- **Authorization**: Verifier role required.
- **Request Body**:
  ```json
  {
    "loanId": "loan_id",
    "status": "approved"
  }
  ```
- **Response**:
  - **200 OK**: Loan status updated successfully.
  - **400 Bad Request**: Invalid data.
  - **500 Internal Server Error**: Update failed.

#### View All Loans
- **Endpoint**: `GET /api/loans/admin/all-loans`
- **Authorization**: Admin role required.
- **Response**:
  - **200 OK**: Returns all loans.
  - **500 Internal Server Error**: Failed to retrieve loans.

#### Assign Verifier
- **Endpoint**: `PUT /api/loans/admin/assign-verifier`
- **Authorization**: Admin role required.
- **Request Body**:
  ```json
  {
    "loanId": "loan_id",
    "verifierId": "verifier_id"
  }
  ```
- **Response**:
  - **200 OK**: Verifier assigned successfully.
  - **400 Bad Request**: Invalid data.
  - **500 Internal Server Error**: Assignment failed.

## Middleware

### Authentication Middleware
- **protect**: Middleware that checks if a user is authenticated. It verifies the JWT token.
- **admin**: Middleware that checks if the authenticated user has admin privileges.
- **verifier**: Middleware that checks if the authenticated user has verifier privileges.

## Error Handling

The application uses centralized error handling to catch and respond to errors gracefully. Error messages will be logged to the console for debugging purposes, while user-facing messages will be returned with appropriate status codes.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. 

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

