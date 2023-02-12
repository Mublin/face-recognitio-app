const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const path = require("path")
const userRouter = require("./routes/userRoute")
const cors = require("cors")
const mongoose = require("mongoose")
const seedRouter = require("./routes/seedRoute")


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
console.log(process.env.MONGODB_URI)
mongoose.connect("mongodb://127.0.0.1/face-detect").then(()=>{
    console.log ("connected to db")
}).catch((error)=> {
    console.log(error.message)
});

app.use("/api/users", userRouter)
app.use("/api/seed", seedRouter)



// let __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/build")))
app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
})
app.use((err, req, res, next)=>{
    res.status(500).send({message: err.message})
})





app.listen(process.env.PORT || 6000, function siu() {
    console.log(`running at port ${process.env.port}`)
})