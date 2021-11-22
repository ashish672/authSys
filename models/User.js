const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Name is required!"],
        maxLength : [32 , "Name should be less than 32 characters!"],
        trim : true
    }, 
    email : {
        type : String,
        required : [true , "Email is required!"],
        match :  [/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i , 'Please use a valid email'],
        unique : true,
        trim : true,
    },
    password : {
        type : String,
        required : [true , "Password is required!"],
        minLength : [7 , 'Password should be more than 7 characters'],
    }
},{ timestamps: { createdAt: 'created_at' } } )

userSchema.pre('save' , async function (next) {
    this.password = await bcrypt.hash(this.password,10);
    next()
})  

const userModel = mongoose.model('User' , userSchema)

module.exports = userModel