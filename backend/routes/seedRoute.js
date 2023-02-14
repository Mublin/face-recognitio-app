const express = require("express")
// const data = require("../data")
const User = require("../models/userModel")


const seedRouter = express.Router()

seedRouter.get('/users', async (req, res)=>{
    await User.deleteMany({})
    const createdUsers = await User.insertMany(data.users)
    res.send({createdUsers})
})

module.exports = seedRouter;