import executeQuery from '../db.js'
import bcrypt from 'bcrypt'
import  jwtGenerator from '../utils/jwtGenerator.js';


export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const user = await executeQuery("SELECT * FROM users WHERE user_email = $1", [email]);

    // If user already exists
    if (user.length !== 0) {
      return res.status(401).send("User already exists"); 
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await executeQuery(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING user_id",
      [name, email, hashedPassword]
    );

    // Check if the insertion was successful and if user_id was returned
    if (newUser.length === 0 || !newUser[0].user_id) {
      return res.status(500).json({ error: "User registration failed. Unable to retrieve user_id." });
    }

    const token = jwtGenerator(newUser.rows[0].user_id);

    res.json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}



export const login = async (req, res) => {
  try {
    // Destructure req.body
    const { email, password } = req.body;

    // Check if user exists
    const user = await executeQuery("SELECT * FROM users WHERE user_email = $1", [email]);
    console.log("Email parameter:", email);

    if (user.length === 0) {
      return res.status(401).json({ error: "Email is incorrect" }); // Return an error JSON response
    }

    // Check if incoming password is the same as in the database
    const validPassword = await bcrypt.compare(password, user[0].user_password);

    if (!validPassword) {
      return res.status(401).json({ error: "Password is incorrect" }); // Return an error JSON response
    }

    // Generate jwt token
    const token = jwtGenerator(user[0].user_id);
    console.log("Generated token:", token); // Log the generated token to the console
    res.json({ token });
  } catch (error) {
    // Handle any other errors that might occur during the login process
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};



export const TokenVerification=async(req,res)=>{
  try {
    res.json(true);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
}


