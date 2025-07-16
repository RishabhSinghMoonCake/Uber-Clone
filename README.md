# 🚗 Uber Clone Backend (Learning Project)
Learning how to build an Uber clone by following Sheriyan's Uber Clone Tutorial.

This project is focused on building the backend of an Uber clone, using modern Node.js practices such as MVC architecture, middleware, token-based authentication, and MongoDB with Mongoose.

📁 Folder Structure

UBER-CLONE/
- ├── Backend/
- │   ├── app.js                 # Sets up Express app, middlewares, and routes
- │   ├── server.js              # Starts the HTTP server
- │   ├── db/
- │   │   └── db.js              # Connects to MongoDB
- │   ├── routes/
- │   │   └── user.routes.js     # User registration route with validations
- │   ├── controllers/
- │   │   └── user.controller.js # Handles business logic for user registration
- │   ├── services/
- │   │   └── user.service.js    # Service layer logic for creating users
- │   └── models/
- │       └── user.model.js      # Mongoose schema and user methods

🚀 Tech Stack / Frameworks Used
Tool	Purpose
Express.js	Web framework built on top of Node.js
Mongoose	ODM for MongoDB
jsonwebtoken	Authentication via JWT
bcryptjs	Password hashing
express-validator	Input validation middleware
cors	Enables cross-origin requests (frontend ↔ backend)

⚙️ Backend Overview
app.js
Initializes the Express application.

Configures middleware:

cors() → Enables cross-origin communication with frontend.

express.json() → Parses incoming requests with JSON payloads and populates req.body.

Connects to MongoDB via connectDB() from db.js.

Mounts routes at /users using userRouter.

db.js
Handles MongoDB connection using Mongoose.

Pulls connection string from environment variables.

server.js
Imports and runs app.js.

Starts the server on the defined port (PORT from .env or default 5001).

🧠 Key Concepts Practiced
MVC architecture (Model → Service → Controller → Route)

Input validation using express-validator

Secure password handling using bcryptjs

Stateless authentication with JWT

Modular file organization for scalability

📫 Future Additions (Optional for You to Try)
🚀 Login endpoint with token generation

🔐 Protected routes using JWT middleware

🛺 Booking logic (rides, locations, etc.)

🧑‍💻 Admin/user role separation

🌍 Integration with Google Maps API

🙋‍♂️ Credits
Tutorial by Sheriyan Coding (YouTube)
This backend was built as part of learning from his Uber Clone tutorial series.
