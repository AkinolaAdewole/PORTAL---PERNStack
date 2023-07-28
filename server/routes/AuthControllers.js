const router = require ("express").Router();
const pool = require("../db"); 

// router.post('/register', async (req,res)=>{
//     try {
//         // destructure req.body
//         const {name, email, password}= req.body;
//         //check if uder exist
//         const user = await pool.query("SELECT * FROM users WHERE user_email=$1",
//         [ email ]);
//         // res.json(user.rows);
//         if(user.rows.length !== 0){
//             return res.status(401).send("user already exist");
//         }
//         console.log(req.body);
//         // Bcrypt the password
//         // Enter the new user inside our database
//         // generate our jwt token
//     } catch (error) {
//         console.error(error);
//     }
// })

const register= async(req,res)=>{
    try {
        const { name, email, password } = req.body;

        // Check if user exists
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

        if (user.rows.length !== 0) {
            return res.status(401).send("User already exists");
        }

        // You can continue with the registration logic here:
        // Bcrypt the password
        // Store the new user inside the database
        // Generate and return a JWT token for authentication

        // Placeholder for bcrypt and database insertion
        const hashedPassword = "hashed_password_here";
        await pool.query(
            "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3)",
            [name, email, hashedPassword]
        );

        // Placeholder for JWT token generation
        const jwtToken = "generated_jwt_token_here";

        // Respond with success and the generated JWT token
        res.status(200).json({ message: "User registration successful", token: jwtToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}


module.exports={register}
