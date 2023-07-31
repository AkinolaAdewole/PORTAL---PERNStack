// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

import express from 'express'
import cors from 'cors';
const App = express();
 
// Middleware
App.use(express.json());
App.use(cors());
import validInformation from "./middleware/validInformation.js";
import authorization from "./middleware/authorization.js"

// Route for authentication
// Import the registerUser function from authController.js
import { register, login, TokenVerification} from './routes/AuthControllers.js';

// Import Dashboard 
import Dashboard from './routes/Dashboard.js';




// Route for user registration
App.post('/register', validInformation, register);
App.post('/login', validInformation, login);

// Routes for token verification
App.get('/tokenverification', authorization, TokenVerification);

// Routes for Dashboard
App.get('/dashboard', authorization,Dashboard);


const port = 5018
App.listen(port, () => {
    console.log(`server is running at port ${port}`);
});
