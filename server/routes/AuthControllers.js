import executeQuery from '../db.js'
import bcrypt from 'bcrypt'
import  jwtGenerator from '../utils/jwtGenerator.js';


// export const register = async (req, res) => {
//   try {
//     const { firstname, lastname, email, password } = req.body; 

//     // Check if user exists
//     const user = await executeQuery("SELECT * FROM users WHERE user_email = $1", [email]);
 
//     // If user already exists
//     if (user.length !== 0) {
//       return res.status(401).send("User already exists"); 
//     } 
 
//     const saltRounds = 10;
//     const salt = await bcrypt.genSalt(saltRounds);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = await executeQuery(
//       "INSERT INTO users (user_firstname, user_lastname, user_email, user_password) VALUES ($1, $2, $3, $4) RETURNING user_id", 
//       [firstname, lastname, email, hashedPassword]
//     );

//     // Check if the insertion was successful and if user_id was returned
//     if (newUser.length === 0 || !newUser[0].user_id) {
//       return res.status(500).json({ error: "User registration failed. Unable to retrieve user_id." });
//     }
 
//     const token = jwtGenerator(newUser[0].user_id); 

//     res.json({ token });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }

// import the necessary modules and functions

export const register = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body; 

    // Check if user exists
    const user = await executeQuery("SELECT * FROM users WHERE user_email = $1", [email]);
    // console.log(user.rows.email);   
 
    // If user already exists
    if (user.rows.length !== 0) { 
      return res.status(401).send("User already exists"); 
    } 
 
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await executeQuery(
      "INSERT INTO users (user_firstname, user_lastname, user_email, user_password) VALUES ($1, $2, $3, $4) RETURNING user_id", 
      [firstname, lastname, email, hashedPassword]
    );

    // Check if the insertion was successful and if user_id was returned
    if (newUser.rows.length === 0 || !newUser.rows[0].user_id) {
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
    console.log("Email being checked:", email);
    const user = await executeQuery("SELECT * FROM users WHERE user_email = $1", [email]);
    // console.log("Query Result:", user);
     

    // if (user.rows.length !== 0) {
    //   return res.status(401).json({ error: "User already exists" });
    // }  
 
    // Check if incoming password is the same as in the database
    const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

    if (!validPassword) {
      // Return an error JSON response
      return res.status(401).json({ error: "Password is incorrect" }); 
    }
    
    // Generate jwt token
    const token = jwtGenerator(user.rows[0].user_id);
    // console.log("Generated token:", token);
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


