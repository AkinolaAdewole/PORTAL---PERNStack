import jwt from 'jsonwebtoken';

const { jwtSecret } = process.env.jwtSecret; // Destructure the jwtSecret from environment variables

const authorization = async (req, res, next) => {
    try {
        const jwtToken = req.header("token");

        // Check if the token is missing
        if (!jwtToken) {
            return res.status(403).json({ message: "You are not authorised, token missing" });
        }

        // Verify if the token is valid
        const payload = jwt.verify(jwtToken, jwtSecret);
        req.user = payload.user;

        next();
    } catch (error) {
        console.error(error.message);

        // Handle specific JWT errors (e.g., token expiration)
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token has expired" });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token" });
        }

        return res.status(403).json({ message: "You are not authorised" });
    }
};

export default authorization;
