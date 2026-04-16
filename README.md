# User Management System — MERN Stack

A full-stack User Management System built with the MERN stack (MongoDB, Express, React, Node.js).
Supports role-based access control (RBAC), JWT authentication, and full user lifecycle management.

## 🔗 Live Demo

- **Frontend:** https://user-management-system-frontend-rtqi.onrender.com
- **Backend API:** https://user-management-system-backend-cbh0.onrender.com

## 🧰 Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React 18, Vite, React Router v6   |
| Backend    | Node.js, Express.js               |
| Database   | MongoDB Atlas + Mongoose          |
| Auth       | JWT (JSON Web Tokens) + bcryptjs  |
| Deployment | Render (backend + frontend)       |

---

## 👥 User Roles & Permissions

| Feature                        | Admin | Manager | User |
|-------------------------------|-------|---------|------|
| Login / Register               | ✅    | ✅      | ✅   |
| View own profile               | ✅    | ✅      | ✅   |
| Update own profile             | ✅    | ✅      | ✅   |
| View all users (paginated)     | ✅    | ✅      | ❌   |
| View user details              | ✅    | ✅      | ❌   |
| Create new user                | ✅    | ❌      | ❌   |
| Edit any user                  | ✅    | ✅*     | ❌   |
| Assign / change roles          | ✅    | ❌      | ❌   |
| Deactivate (soft delete) user  | ✅    | ❌      | ❌   |

> *Manager can only edit non-admin users

---

## 📁 Project Structure
user-management-system/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js      # login, register, getMe
│   │   └── userController.js      # CRUD operations
│   ├── middleware/
│   │   ├── authMiddleware.js      # JWT verification
│   │   └── roleMiddleware.js      # Role-based access control
│   ├── models/
│   │   └── User.js                # User schema & model
│   ├── routes/
│   │   ├── authRoutes.js          # /api/auth/*
│   │   └── userRoutes.js          # /api/users/*
|   |-- util/
|   |   |-- asyncHandler.js
|   |   |-- errorHandler.js
|   |   |-- generateJWTToken.js
│   ├── seed.js                    # Database 
seeder
│   ├── .env.example
│   └── server.js                  # Entry point
└── frontend/
├── src/
│   ├── api/
│   │   └── axios.js            # Axios instance with interceptor
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── UserForm.jsx
│   ├── context/
│   │   └── AuthContext.jsx     # Global auth state
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── UserList.jsx
│   │   ├── UserDetail.jsx
│   │   └── MyProfile.jsx
│   ├── App.jsx
│   └── main.jsx
├── .env.example
└── index.html

---

## ⚙️ Local Setup Instructions

### Prerequisites

Make sure you have these installed:
- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/) v9+
- [MongoDB Atlas](https://www.mongodb.com/atlas) account (free tier works)
- [Git](https://git-scm.com/)

---

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/user-management-system.git
cd user-management-system
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create your `.env` file:

```bash
cp env.example .env
```

Fill in your values in `.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/usermanagement
JWT_SECRET=your_super_secret_key_minimum_32_chars
JWT_EXPIRE=7d
NODE_ENV=development
```
Change cors setting -
```
origin: "*"
```


Seed the database with default users:

```bash
node seed.js
```

Start the backend server:

```bash
npm run dev       # development (nodemon)
npm start         # production
```

Backend runs at: `http://localhost:5000`

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```
Change the url in axios instance in api/axios.js -
```
  baseURL: "http://localhost:5000/api/"
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

### 4. Default Seeded Accounts

| Role    | Email                  | Password    |
|---------|------------------------|-------------|
| Admin   | admin@example.com      | admin123    |
| Manager | manager@example.com    | manager123  |
| User    | user@example.com       | user1234    |

> ⚠️ Change these credentials immediately in production!

---

## 🔌 API Reference

### Auth Endpoints

| Method | Endpoint              | Access  | Description          |
|--------|-----------------------|---------|----------------------|
| POST   | `/api/auth/register`  | Public  | Register new user    |
| POST   | `/api/auth/login`     | Public  | Login, returns JWT   |
| POST   | `/api/auth/logout`    | public  | Logout User
| GET    | `/api/auth/me`        | Private | Get logged-in user   |

### User Endpoints

| Method | Endpoint              | Access           | Description                        |
|--------|-----------------------|------------------|------------------------------------|
| GET    | `/api/users`          | Admin, Manager   | Get all users (paginated + filters)|
| POST   | `/api/users`          | Admin only       | Create a new user                  |
| GET    | `/api/users/profile`  | Any logged-in    | Get own profile                    |
| PUT    | `/api/users/profile`  | Any logged-in    | Update own profile                 |
| GET    | `/api/users/:id`      | Admin, Manager   | Get user by ID                     |
| PUT    | `/api/users/:id`      | Admin, Manager   | Update user by ID                  |
| DELETE | `/api/users/:id`      | Admin only       | Soft delete (deactivate) user      |

### Query Parameters (GET `/api/users`)

| Param    | Type   | Description                     |
|----------|--------|---------------------------------|
| search   | string | Search by name or email         |
| role     | string | Filter by role (admin/manager/user) |
| status   | string | Filter by status (active/inactive)  |
| page     | number | Page number (default: 1)        |
| limit    | number | Results per page (default: 10)  |

---

## 🚀 Deployment (Render)

### Backend

1. Push `backend/` to GitHub
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect your repository
4. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
5. Add environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `JWT_EXPIRE`
   - `NODE_ENV=production`

### Frontend

1. Go to [render.com](https://render.com) → **New Static Site**
2. Connect your repository
3. Configure:
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `./dist`
4. Add backend url in axios instance

> After deploying, update backend CORS:
> ```js
> app.use(cors({ origin: 'https://your-frontend.onrender.com' }));
> ```

---

## 🔐 Security Features

- Passwords hashed using **bcryptjs** (salt rounds: 10)
- JWT tokens with configurable expiration
- Protected API routes via middleware
- Role-based access enforced on every backend route
- Inactive users blocked from logging in
- Sensitive fields (password) never returned in API responses
- Input validation on all endpoints via **Zod**
- Environment variables used for all secrets

---

## 🗄️ Database Schema

See [`/backend/models/User.js`](./backend/models/User.js) for the full Mongoose schema.

### User Collection

| Field       | Type     | Required | Description                        |
|-------------|----------|----------|------------------------------------|
| name        | String   | Yes      | Full name                          |
| email       | String   | Yes      | Unique, lowercase                  |
| password    | String   | Yes      | Bcrypt hashed, not returned in API |
| role        | String   | Yes      | admin / manager / user             |
| status      | String   | Yes      | active / inactive                  |
| createdBy   | ObjectId | No       | Ref to User who created            |
| updatedBy   | ObjectId | No       | Ref to User who last updated       |
| createdAt   | Date     | Auto     | Mongoose timestamp                 |
| updatedAt   | Date     | Auto     | Mongoose timestamp                 |

---

## 📌 Environment Variables Reference

### Backend `.env.example`

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/usermanagement
JWT_SECRET=your_super_secret_key_minimum_32_chars
JWT_EXPIRE=7d
NODE_ENV=development
```



---

## 👨‍💻 Author

**Your Name**  
GitHub: [RijuSaha004](https://github.com/RijuSaha004)

