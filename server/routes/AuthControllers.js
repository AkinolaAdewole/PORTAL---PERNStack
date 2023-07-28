const router = require ("express").Router();
const pool = require("../db"); 
const bcrypt= require('bcrypt');
const jwt = require ("jsonwebtoken");

const jwtGenerator=(user_id)=>{
    const payload ={
        user:user_id
    }

    jwt.sign(payload, process.env.jwtSecret,{expiresIn:"1h"})
}



const register= async(req,res)=>{
    try {
        const { name, email, password } = req.body;

        // Check if user exists
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

        // If user already exist
        if (user.rows.length !== 0) {
            return res.status(401).send("User already exists");
        }
        // Bcrypt the password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser=await pool.query(
            "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3)",
            [name, email, hashedPassword]
        );

              // Store the new user inside the database

                        const userId = newUser.rows[0].user_id;
            
                        // Generate JWT token using the userId
                        const token = jwtGenerator(userId);
                        console.log(token);
                
                        res.json({ token });
                    
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}


module.exports={jwtGenerator,register}
