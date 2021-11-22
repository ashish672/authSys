require("dotenv").config()
const User = require("../../models/User");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//  route       /api/v1/register
//  desc        Register Route
//  access      Public
const register = async (req,res) => {

    try {
        
        const user = await User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
        })

        // user.password =  await bcrypt.hash(req.body.password,10);
        
        const token = jwt.sign({
            id : user._id,
            email : user.email
          }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        res.status(201).json({
            success : true,
            error:null,
            msg : "Registered Succesfully!",
            data : {
                user,
                token 
            }
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success : false,
            msg : error.message
        })
    }


}


//  route       /api/v1/login
//  desc        Login Route 
//  access      Public
const login = async (req,res) => {

    const {  email, password } = req.body

    try {
        const user = await User.findOne({
            email
        })
    
        if(!user) {
            res.status(400).json({
                success : false,
                error : null,
                data : null,
                msg : 'Invalid Credentials!'
            })
        }

        const isPasswordMatched = await bcrypt.compare(password , user.password)
        if(!isPasswordMatched) {
            res.status(400).json({
                success : false,
                error : null,
                data : null,
                msg : 'Invalid Credentials!'
            })
        }

        if(user && isPasswordMatched) {
            const token = jwt.sign({
                id : user._id,
                email : user.email
              }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    
            user.password = undefined;
            res.status(200).cookie('token', token, {expires : new Date(Date.now() + 3 * 24 * 60* 60 *1000) , httpOnly : true} ).json({
                success : true,
                error : null,
                data : {
                    name : user.name,
                    email : user.email,
                    token 
                },
                msg : "Login Successfully!"
            })
        }

    } catch (error) {

        console.log(error);
        res.status(400).json({
            success : false,
            msg : error.message
        })
    }
}

//  route       /api/v1/protect
//  desc        Route to protect our resource
//  access      Private

const protect = async (req,res) => {

    try {
        if(req.info._id){
            const user = await User.findById(req.info._id)
            if(user) {
                res.status(200).json({
                    msg : "Sensitive information"
                })
            }
        }
            

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success : false,
            msg : error.message
        })
    }

}

module.exports = {
    register ,
    login,
    protect
}