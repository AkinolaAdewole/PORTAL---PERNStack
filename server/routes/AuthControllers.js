const pool = require("../db");
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

    // If user already exists
    if (user.rows.length !== 0) {
      return res.status(401).send("User already exists"); 
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING user_id",
      [name, email, hashedPassword]
    );

    // Check if the insertion was successful and if user_id was returned
    if (newUser.rows.length === 0 || !newUser.rows[0].user_id) {
      return res.status(500).json({ error: "User registration failed. Unable to retrieve user_id." });
    }

    const token = jwtGenerator(newUser.rows[0].user_id);
    console.log(token);
    res.json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {register}; 

