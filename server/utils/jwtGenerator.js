import jwt from "jsonwebtoken";


const jwtGenerator = (user_id) => {
  const payload = {
    user: user_id 
  };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1h" });
};

export default jwtGenerator;
