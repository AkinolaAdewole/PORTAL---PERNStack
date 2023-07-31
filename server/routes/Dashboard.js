import  pool from "../db.js"; 

const Dashboard=async(req,res)=>{
    try {
        // req.user has the payload
        res.json(req.user);
    } catch (err) {
        console.error(err);
        res.status(500).json('server error');
        
    }
}

export default Dashboard;