🌸 WED AURA – Backend
📌 Project Overview

WED AURA is an AI-powered wedding planning and vendor management platform.
The backend is responsible for handling user authentication, vendor management, bookings, payments, real-time chat, notifications, AI-based predictions, and admin analytics.

The backend is built using Node.js, Express.js, and MongoDB, following a modular MVC architecture for scalability and maintainability.

🛠️ Backend Tech Stack

Node.js – Runtime environment

Express.js – Backend framework

MongoDB (Atlas) – NoSQL database

Mongoose – MongoDB object modeling

JWT – Authentication & authorization

Socket.io – Real-time chat system

Razorpay – Online payment gateway

Python (ML) – Predictive budget & vendor recommendation

Multer – File uploads (images, videos, bills)

📂 Backend Folder Structure
backend/
├── src/
│   ├── config/          # Database, environment, payment & socket configs
│   ├── models/          # MongoDB schemas
│   ├── controllers/     # Business logic
│   ├── routes/          # API routes
│   ├── middlewares/     # Auth, role, error, upload middlewares
│   ├── services/        # Email, SMS, payment, AI services
│   ├── ai/              # ML datasets, models & Python scripts
│   ├── utils/           # Helper utilities (JWT, logger, response)
│   ├── validations/     # Input validation schemas
│   ├── app.js           # Express app configuration
│   └── server.js        # Server entry point
│
├── uploads/             # Uploaded images, videos, bills
├── logs/                # Error & access logs
├── .env                 # Environment variables
├── package.json
└── README.md

🔑 Key Backend Features
👤 User & Vendor Authentication

Secure registration and login using JWT

Role-based access (User, Vendor, Admin)

🏪 Vendor & Service Management

Vendor profiles with:

Service details

Packages

Portfolio (images/videos)

Booking calendar

📅 Booking System

Users can book vendors

Vendors can accept or reject bookings

Booking status visible in user dashboard

💳 Online Payment System

Razorpay integration

Secure payment verification
Automatic bill generation after payment

💬 Real-Time Chat System

Live chat between users and vendors

Implemented using Socket.io

Messages stored in MongoDB

🔔 Notifications

Booking confirmation alerts

Payment success notifications

Email / SMS / in-app notifications

🤖 AI-Based Features

Predictive Budget Planning

Vendor Recommendation System

ML models trained using historical booking data

Python scripts integrated with Node.js backend

📊 Admin Analytics Dashboard

User & vendor statistics

Booking trends

Revenue analysis

AI-based insights

🔐 Security Features

Password hashing using bcrypt

JWT-based authentication

Role-based authorization

API rate limiting

Centralized error handling

📦 Required Packages

express

mongoose

dotenv

cors

bcryptjs

jsonwebtoken

multer

socket.io

razorpay

nodemailer

express-rate-limit

winston

morgan

joi