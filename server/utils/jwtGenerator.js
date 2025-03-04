import jwt from "jsonwebtoken";

const { jwtSecret } = process.env.jwtSecret; // Destructure the jwtSecret from environment variables

const jwtGenerator = (user_id, expiresIn = "1h") => {
  try {
    const payload = {
      user: user_id,
    };

    return jwt.sign(payload, jwtSecret, { expiresIn });
  } catch (error) {
    console.error("Error generating JWT:", error.message);
    throw new Error("JWT generation failed");
  }
};

export default jwtGenerator;
