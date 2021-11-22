const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
          })

        console.log(`MongoDb Connected! at ${conn.connection.host}`);  
        
    } catch (error) {
        console.log(error);
        console.log(`MongoDb cannot be connected!`)
    }
}

module.exports = connectDb