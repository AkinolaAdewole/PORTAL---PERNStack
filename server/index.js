// Load environment variables from .env file
require('dotenv').config();

const express = require("express");
const cors = require("cors");
const App = express();

// Middleware
App.use(express.json());
App.use(cors());
const validInformation = require("./middleware/validInformation");
const authorization= require("./middleware/authorization");

// Route for authentication
// Import the registerUser function from authController.js
const { register, login, TokenVerification} = require('./routes/AuthControllers.js');




// Route for user registration
App.post('/register', validInformation, register);
App.post('/login', validInformation, login);
App.get('/tokenverification', authorization, TokenVerification);


const port = 5018
App.listen(port, () => {
    console.log(`server is running at port ${port}`);
});
