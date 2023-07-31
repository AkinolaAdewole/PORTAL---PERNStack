import  executeQuery from "../db.js"; 

const Dashboard=async(req,res)=>{
    try {
        // req.user has the payload
        const user = executeQuery("SELECT user_firstname FROM users WHERE user_id=$1",[req.user]);
        res.status(200).json(user[0]); 
        // res.json(user[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json('server error');
        
    }
}

export default Dashboard;