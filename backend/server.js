const express = require("express")
const userRouter = require("./routes/userRoute")
const dotenv = require("dotenv").config()
const cors = require("cors")
const mongoose = require("mongoose")
const seedRouter = require("./routes/seedRoute")


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log ("connected to db")
}).catch((error)=> {
    console.log(error.message)
});

app.use("/api/users", userRouter)
app.use("/api/seed", seedRouter)





app.listen(process.env.PORT || 5000, function siu() {
    console.log(`running at port ${process.env.port}`)
})