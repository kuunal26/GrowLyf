
GrowLyf

GrowLyf is a full-stack Sales Tracking Web Application built using the MERN stack (MongoDB, Express, React, Node.js).
It allows small businesses and shopkeepers to record, manage, and analyze daily sales with secure authentication and downloadable reports.

⸻

Features
	•	User Authentication (JWT-based Login & Registration)
	•	Role-based access (User/Admin)
	•	Add and manage sales records
	•	View top-performing products and revenue statistics
	•	Export sales reports as Excel files
	•	Responsive UI with Redux state management

⸻

Tech Stack

Frontend: React.js, Redux, Axios, CSS
Backend: Node.js, Express.js
Database: MongoDB (Mongoose ORM)
Authentication: JSON Web Tokens (JWT)

⸻

Project Structure

GrowLyf-main/
│
├── client/                     # React Frontend
│   ├── src/
│   │   ├── pages/              # Login, Register, Sales, Revenue
│   │   ├── components/         # Header, Excel download
│   │   ├── redux/              # Store & user reducer
│   │   └── config/config.js     # API base URL
│   └── public/                 # Static assets
│
├── server/                     # Node.js Backend
│   ├── config/dbConfig.js       # MongoDB connection
│   ├── controllers/            # Auth & Sales logic
│   ├── middleware/authMiddleware.js
│   ├── models/                 # Mongoose Schemas
│   ├── routes/                 # API endpoints
│   └── server.js               # App entry point
│
└── README.md


⸻

Installation & Setup

1. Clone the repository

git clone https://github.com/<your-username>/GrowLyf.git
cd GrowLyf-main

2. Setup Backend

cd server
npm install

Create a .env file in /server and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

Start backend:

npm start

3. Setup Frontend

cd ../client
npm install
npm start


⸻

Available Scripts

Backend
	•	npm start → Runs Express server with Nodemon

Frontend
	•	npm start → Runs React app on http://localhost:3000/

⸻

API Endpoints

Auth Routes (/api/auth)
	•	POST /register → Register user
	•	POST /login → Login user and return JWT
	•	GET /me → Get logged-in user details (protected)

Sales Routes (/api/sales)
	•	POST /add → Add new sales record (protected)
	•	GET /all → Fetch all sales data (protected)
	•	GET /top → Get top-performing products (protected)

⸻

Future Enhancements
	•	Add advanced analytics dashboards
	•	Multi-language support
	•	Mobile App version (React Native)
	•	Role-based reporting for admins

⸻

Author

Kunal Dhanawade
MERN Stack Developer | Electronics & Telecommunication Engineering

⸻
