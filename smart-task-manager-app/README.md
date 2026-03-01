# 📱 Smart Task Manager – Mobile App (Expo)

## 📌 Overview

This repository contains the Expo React Native mobile application for the Smart Task Manager project.

The application allows users to register, authenticate securely using JWT, and manage their tasks efficiently. It is built using TypeScript and follows clean architecture principles with a modular and scalable folder structure.

This frontend communicates with a deployed Node.js + MongoDB backend API.

---

## 🚀 Tech Stack

- Expo React Native
- TypeScript
- Expo Router (File-based Navigation)
- Context API (Global State Management)
- Axios (API Communication)
- JWT Authentication
- EAS Build (Android APK)

---

## ✨ Features

- 🔐 User Registration & Login
- 🔑 JWT-based Authentication
- 📝 Create, Read, Update, Delete Tasks
- 📊 Task Status Management (Pending / In Progress / Completed)
- 🔍 Task Filtering
- 📈 Progress Summary Dashboard
- ⏳ Loading & Empty States
- ✅ Form Validation
- 🎨 Clean & Responsive UI
- 🧭 Protected Routes using Expo Router

---

## 🏗 Project Structure

```
app/
  (auth)/              → Login & Register screens
  (protected)/         → Authenticated screens
  _layout.tsx          → Root navigation layout

components/            → Reusable UI components
context/               → AuthContext & TaskContext
hooks/                 → Custom hooks
services/              → API configuration (axios)
types/                 → TypeScript type definitions
utils/                 → Helper functions
```

---

## 🧭 Navigation (Expo Router)

The project uses Expo Router (file-based routing) for navigation.

- (auth) group handles authentication screens.
- (protected) group contains screens accessible only after login.
- _layout.tsx controls navigation stack.
- Authentication state determines route access.
- Unauthorized users are automatically redirected to login.

This ensures a clean separation between public and private routes.

---

## 🔐 Authentication Flow

1. User registers or logs in.
2. Backend validates credentials and returns a JWT token.
3. Token is stored securely on the device.
4. Protected routes require valid authentication state.
5. If token is invalid or missing, user is redirected to login.

---

## 🌐 API Integration

All API requests are centralized inside the services folder using Axios.

- Base URL is configured using environment variables.
- JWT token is attached to protected requests.
- Errors are handled gracefully and shown to users.

---
## 🌍 Backend API

The backend API is deployed on Render.

Production Base URL:

```bash
EXPO_PUBLIC_BASE_URL=https://smart-task-manager-8vvw.onrender.com/api
```

The base URL is configured using environment variables and is not hardcoded directly inside the source code.

---

## 🛠 Installation & Running Locally

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npx expo start
```

Clear cache if needed:

```bash
npx expo start -c
```

## 📦 Android APK Build

This project uses EAS Build to generate a production Android APK:

```bash
eas build -p android
```

Make sure you are logged in to Expo before building:

```bash
eas login
```

## 🧠 State Management

- AuthContext manages user authentication state globally.
- TaskContext manages task data across the application.
- Context API ensures clean and centralized state management.
- Custom hooks simplify access to global state.

---

## 🛡 Security Practices

- JWT-based authentication
- Protected routing using authentication checks
- Secure API communication
- Environment variable configuration
- User-specific task access control

---

## 📚 Academic Context

This project was developed as part of a Software Engineering assessment to demonstrate:

- Clean architecture principles
- REST API integration
- Secure authentication practices
- State management using Context API
- Responsive mobile UI/UX
- Deployment readiness
 ---
 ## 👨‍💻 Author
Sourav Biswas