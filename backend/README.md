# Smart Task Manager - Backend API

## Project Overview

This is the backend API for the Smart Task Manager mobile application.  
It provides secure authentication and task management using RESTful API design.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

---

## Core Features

- User Registration & Login (JWT Based)
- Protected Routes
- Task CRUD Operations
- Ownership Validation (User can manage only their own tasks)
- Status Enum Validation (Pending, In Progress, Completed)

---
## ⚙️ Installation Process

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/ez-sourav/Smart-Task-Manager.git
```

---

### 2️⃣ Install Dependencies

```bash
cd backend
npm install
```

---

### 3️⃣ Setup Environment Variables

Create a `.env` file inside the `backend` folder and add:

```
PORT=3000
MONGO_URL=your_mongodb_url
JWT_SECRET=your_secret_key
```

---

### 4️⃣ Run the Server

```bash
npm run dev
```

OR

```bash
npm start
```

If successful, you will see:

```
Server running on port 3000
MongoDB Connected Successfully
```

## API Endpoints

### Authentication
POST /api/auth/register  
POST /api/auth/login  

### Tasks (Protected)
GET    /api/tasks  
POST   /api/tasks  
PUT    /api/tasks/:id  
DELETE /api/tasks/:id  

---

## Architecture Notes

- RESTful API design
- MongoDB referencing (User → Tasks)
- Schema validation using Mongoose
- Secure password hashing
- JWT-based stateless authentication