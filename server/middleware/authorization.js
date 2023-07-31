import jwt from 'jsonwebtoken';


const authorization = async(req,res,next)=>{
    try {
        const jwtToken = req.header("token");
        if(!jwtToken){
            return res.status(403).json("You are not authorised");
        }

        // Verify if the token is genuine
        const payload=jwt.verify(jwtToken, process.env.jwtSecret);
        req.user=payload.user;
        next();
    } catch (error) {
        console.error(error.message);
        return res.status(403).json("You are not authorised");
    }
}

export default authorization;