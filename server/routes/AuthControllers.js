const router = require ("express").Router();
const pool = require("../db"); 
const bcrypt= require('bcrypt');
const jwtGenerator= require('../utils/jwtGenerator');



const register= async(req,res)=>{
    try {
        const { name, email, password } = req.body;

        // Check if user exists
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser=await pool.query(
            "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3)",
            [name, email, hashedPassword]
        );

      

        // If user already exist
        if (user.rows.length !== 0) {
            return res.status(401).send("User already exists");

        } 
        // else if(newUser.rows.length === 0){
        //     console.log();

        //     return res.status(500).json({ error: "User registration failed. Unable to retrieve user_id." });
        // } 
        else{

            // Check the value of newUser.rows
            result.rows.forEach((user) => {
                const user_id = user.user_id;
                console.log('User ID:', user_id);
              }); 

            const token = jwtGenerator(newUser.rows[0].user_id);
            console.log(token);
            res.json({ token });
        }
       
          
                    
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}


module.exports={register}
