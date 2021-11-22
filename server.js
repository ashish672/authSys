const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config();
const connectDb = require("./config/database")
connectDb();
const cookieParser = require("cookie-parser")
const PORT = process.env.PORT

const auth = require("./routes/auth/auth")

app.use(express.json());
app.use(cookieParser())

app.use('/api/v1' , auth)

app.get("/" , (req,res) => {
    res.status(200).send("<h1>Hello World!</h1>")
})

app.listen(PORT , () => console.log(`Server running on PORT ${PORT}`))