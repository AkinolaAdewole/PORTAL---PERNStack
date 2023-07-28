const jwt = require ("jsonwebtoken");

const jwtGenerator=()=>{
    const payload ={
        user:user_id
    }

    jwt.sign(payload, process.env.jwtSecret,{expiresIn:"1h"})
}

module.exports = jwtGenerator;