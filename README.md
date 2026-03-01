# 🚀 Smart Task Manager – Full Stack Mobile Application

A production-ready full-stack mobile task management application built using **Expo React Native (TypeScript)** and **Node.js + MongoDB**.

This project demonstrates secure authentication, REST API integration, clean architecture, state management, and deployment readiness following modern development standards.

---

## 📱 Project Overview

Smart Task Manager allows users to:

- Register and login securely using JWT
- Create, update, and delete tasks
- Filter tasks by status
- Track task progress through a dashboard
- Manage personal tasks with user-specific data isolation

The system is built using a modular full-stack architecture and follows clean coding principles.

---
## 📥 Download APK

You can download the latest Android build below:

[![Download APK](https://img.shields.io/badge/Download-Android_APK-green?style=for-the-badge&logo=android)](https://github.com/ez-sourav/Smart-Task-Manager/releases/latest)

Install the APK on your Android device to test the application.

---

## 🏗 Full Stack Architecture

```
Mobile App (Expo React Native)
        ↓
REST API (Node.js + Express)
        ↓
MongoDB Database
```

- Frontend communicates with backend via RESTful APIs.
- Backend handles authentication and task management.
- MongoDB stores user and task data securely.
- JWT ensures stateless authentication.

---

## 🛠 Tech Stack

### 📱 Frontend (Mobile App)
- Expo React Native
- TypeScript
- Expo Router (File-based Navigation)
- Context API (State Management)
- Axios
- EAS Build

### 🖥 Backend (API)
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

---

## 📂 Project Structure

```
Smart-Task-Manager/
 ├── backend/                     → Node.js REST API
 ├── smart-task-manager-app/      → Expo React Native App
 └── README.md                    → Full Stack Overview
```

---

## ✨ Core Features

### 🔐 Authentication
- User Registration
- User Login
- JWT-based Authentication
- Protected Routes

### 📝 Task Management
- Create Task
- Update Task
- Delete Task
- Fetch User-Specific Tasks
- Status Enum Validation (Pending / In Progress / Completed)

### 📊 Dashboard
- Progress Summary
- Loading & Empty States
- Clean Responsive UI

---

## 🌍 Live Backend API

The backend API is deployed on **Render**.

Production Base URL:

```bash
https://smart-task-manager-8vvw.onrender.com/api
```

The frontend uses environment variables to configure the API base URL.

---

## ⚙️ Environment Configuration

### Backend `.env`

```
PORT=3000
MONGO_URL=your_mongodb_url
JWT_SECRET=your_secret_key
```

### Frontend `.env`

```
EXPO_PUBLIC_BASE_URL=https://smart-task-manager-8vvw.onrender.com/api
```

Sensitive values are not committed to version control.

---

## 🚀 Running the Project Locally

### 1️⃣ Backend

```bash
cd backend
npm install
npm run dev
```

---

### 2️⃣ Frontend

```bash
cd smart-task-manager-app
npm install
npx expo start
```

---

## 📦 Android APK Build

The mobile application is built using EAS Build:

```bash
eas build -p android
```

---

## 🔐 Security Practices

- JWT-based stateless authentication
- Password hashing using bcrypt
- Protected API routes
- User-specific task ownership validation
- Environment variable configuration
- Secure database schema validation

---

## 📚 Academic Context

This project was developed as part of a Software Engineering assessment to demonstrate:

- Clean architecture principles
- RESTful API design
- Secure authentication practices
- Database schema design
- State management
- Mobile UI/UX implementation
- Deployment readiness

---

## 👨‍💻 Author

Sourav Biswas

---

## 📌 Repository Links

- 🔹 Backend API → [backend](./backend)
- 🔹 Mobile App → [smart-task-manager-app](./smart-task-manager-app)

---

⭐ If you find this project useful, feel free to explore and provide feedback.