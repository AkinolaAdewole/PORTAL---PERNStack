const validInformation=(req,res,next)=>{
    const {email, name, password}=req.body;

    // Check if Email is valid
    const validEmail=(userEmail)=>{
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    if(req.path === "/register"){
        console.log(!email.length);

        // email, name and password are not empty value
        if(![email,name,password].every(Boolean)){
            return res.status(401).json("Missing Credentials");
        } else if(!validEmail(email)){
            return res.status(401).json("Invalid Email")
        }

    } else if(req.path === "/login"){
        // email, name and password are  not empty during login
        if(![email,password].every(Boolean)){
            return res.status(401).json("Missing credentials");
        }  else if(!validEmail(email)){
            return res.status(401).json("Invalid Email");
        }
    }

    next();
}

export default validInformation;