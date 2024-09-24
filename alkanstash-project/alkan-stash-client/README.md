# Alkan Stash App

## Project Overview

**Alkan Stash** is a savings jar app that allows users to create savings jars, manage transactions, and track progress. The application is built using Express.js on the backend and integrates Swagger for API documentation. It provides both authentication and CRUD operations for jars and transactions.

## Features

- User registration and login
- Create and manage savings jars
- Track deposits and withdrawals in each jar
- Retrieve and update jars and transactions
- API documentation using Swagger

## Table of Contents

1. Installation
2. Usage
3. API Documentation
4. Backend Structure
   - Auth Routes
   - Savings Jar Routes 
   - Transaction Routes 
5. Frontend Structure 
6. Running the Project 

## Installation

To set up the project on your local machine, follow these steps:

### Backend Setup

1. Clone the repository:

```bash
git clone https://github.com/alkanstash-project/alkan-stash-server.git
```

2. Navigate to the project directory:

```bash
cd alkan-stash-server
```

3. Install backend dependencies:

```bash
npm install
```

4. Create a `.env` file for environment variables such as database connection strings:

```
MONGO_URI=your_mongodb_uri
```

5. Run the server:

```bash
npm start
```

The backend server will start on the default port `3000`.

### Frontend Setup

1. Navigate to the frontend project folder (if in a separate repository):

```bash
cd alkan-stash-client
```

2. Install frontend dependencies:

```bash
npm install
```

3. Run the frontend application:

```bash
npm start
```

The frontend server will start on the default port `3001`.

## API Documentation

The project uses Swagger to document the available API routes. After running the backend server, you can access the Swagger UI at:

```
http://localhost:3000/api-docs
```

## Backend Structure

The backend is structured as an Express.js app with the following routes and controllers:

### Auth Routes

**File:** `/routes/authRoutes.js`

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Log in a user.
- **GET /api/auth/user/:username**: Get user details by username.

**Swagger Tags:** `Auth`

### Savings Jar Routes

**File:** `/routes/savingsJarRoutes.js`

- **POST /api/jars**: Create a new savings jar.
- **GET /api/jars/:userId**: Get all jars by a specific user.
- **GET /api/jars/:userId/:jarId**: Get a specific jar by userId and jarId.
- **DELETE /api/jars/:userId/:jarId**: Mark a jar as deleted.
- **PUT /api/jars/:userId/:jarId**: Update a jar.

**Swagger Tags:** `Savings Jars`

### Transaction Routes

**File:** `/routes/transactionRoutes.js`

- **POST /api/transactions**: Create a new transaction.
- **GET /api/transactions/:userId/:jarId**: Get transactions by userId and jarId.
- **DELETE /api/transactions/:userId/:jarId**: Mark a transaction as deleted.

**Swagger Tags:** `Transactions`

## Frontend Structure

The frontend handles user interactions with the savings jars and transactions. It communicates with the backend API to create and retrieve data.

**Frontend Features:**
- User Registration and Login Pages
- Dashboard for viewing savings jars
- Transaction management (deposit, withdraw)
  
**Key Files:**
- `App.jsx`: Main entry point for the React application.
- `Dashboard.jsx`: Displays all jars and transactions.
- `Auth.jsx`: Handles user registration and login.

## Running the Project

To run both the frontend and backend servers simultaneously:

1. **Backend**: Run `npm start` from the `alkan-stash-server` directory.
2. **Frontend**: Run `npm start` from the `alkan-stash-client` directory.

Access the frontend at:

```
http://localhost:5173
```

And the API documentation at:

```
http://localhost:5000/api-docs
```

---

### Notes:

1. **Swagger Integration:** Swagger has been integrated into the backend routes (auth, jars, and transactions). This will auto-generate API documentation when you visit the `/api-docs` endpoint.
2. **Dependencies:** Ensure `swagger-jsdoc` and `swagger-ui-express` are installed as dependencies in the backend project.
3. **Customization:** Modify the `.env` file for your specific environment settings (e.g., MongoDB URI).
