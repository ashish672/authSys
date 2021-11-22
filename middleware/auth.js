require("dotenv").config()
const jwt = require("jsonwebtoken")

const authMiddleware = async (req,res,next) => {
    try {
        console.log("Protect Middleware running!");

        const token =  req.cookies.token || req.body.token || req.headers["authorization"].split(" ")[1] ;
        
        if(typeof token !== "undefined") {
            
            // if() {

            // }
            // const token = bearerToken || bearerToken.split(" ")[1]
            
            const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
            
            req.info = {
                _id : decoded.id,
                email : decoded.email 
            }

        } else {
            res.status(403).json({
                success : false,
                data : null,
                error : "Not allowed to access the route!"
            })
        }
    
    } catch (error) {
        console.log(error);
        res.status(403).json({
            success : false,
            data : null,
            error : "Invalid Token!"
        })
    }
    next()
}

module.exports = {
    authMiddleware
}