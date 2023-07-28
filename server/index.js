// Load environment variables from .env file
require('dotenv').config();

const express = require("express");
const cors = require("cors");
const App = express();

// Middleware
App.use(express.json());
App.use(cors());

// Route for authentication
// Import the registerUser function from authController.js
const { register} = require('./routes/AuthControllers.js');


// Route for user registration
App.post('/register', register);


App.listen(5005, () => {
    console.log("server is up at port 5001");
});
