const express = require("express");
const data = require("../data");
const User = require("../models/userModel");
const utils = require("../utils")
const expressasynchandler = require("express-async-handler")
const axios = require("axios")
const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");
// const { default: User } = require("../models/userModel");


const userRouter = express.Router()



const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();
metadata.set("authorization", "Key 5ac247ce9ae24b5b8525c3e9858820e6");

function predictFace(imageUrl) {
    return new Promise((resolve, reject)=> {
        stub.PostModelOutputs(
            {
                // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
                model_id: "face-detection",
                inputs: [{data: {image: {url: imageUrl}}}]
            },
            metadata,
            (err, response) => {
                if (err) {
                    reject("Error: " + err);
                    return;
                }
        
                if (response.status.code !== 10000) {
                    reject("Received failed status: " + response.status.description + "\n" + response.status.details);
                    return;
                }
                let result = []
                result.push(response.outputs[0].data)
                
                resolve(result)
            }
        );
        })
}




userRouter.post("/register", async (req, res)=>{
    const {username, fullName, password, email} = req.body;
    const newUser = new User({
        username,
        name: fullName,
        email,
        password: password
    })
    const user = await newUser.save()
    if (user) {
        res.send({
            username: user.username,
            _id: user._id,
            name: user.name,
            email: user.email,
            token: utils.generateToken(user)
        })
    } else {
        res.status(401).send({message: "User is not created"})
    }
})
userRouter.post("/signin", expressasynchandler(async (req, res)=>{
    const { password, email} = req.body;
    const user = await User.findOne({email})
    // console.log(user, password, email)
        if (user){
            if (email == user.email && password == user.password) {
                res.status(200).send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    username: user.username,
                    token: utils.generateToken(user)
                })
            } else {
                res.status(401).send({message: "invalid user or password"})
            }
        }else{
            res.status(401).send({message: "Inavlid User"})
        }
    })
)
userRouter.post("/image", utils.isAuth, expressasynchandler(async (req, res)=>{
    const {imageSrc} = req.body;
    try {
        const result = await predictFace(imageSrc)
        res.send({result})
    } catch (error) {
        console.log(error)
        res.status(401).send(error)
    }
    // try {
    //     const {newData} = await axios.post(`"https://api.clarifai.com/v2/models/fe995da8cb73490f8556416ecf25cea3/versions/face-detect/outputs`, {
    //     "inputs": [
    //         {
    //             "data": {
    //                 "image": {
    //                     "url": "https://www.programmersought.com/images/531/95f8a6c499841ba44a5c31463e2cccd3.png"
    //                 }
    //             }
    //         }
    //     ]
    // },{
    //     headers: {
    //         "Authorization": `Key 4f8b5811a00c439bb8798ec6f06cac80`,
    //         "Content-Type": "application/json"
    //     },
    // })
    // console.log(newData)
    // res.send(newData)
    // } catch (error) {
    //   console.log(error)  
    // }
}))
userRouter.get("/profile/:id", utils.isAuth, expressasynchandler(async(req, res)=>{
    const {id} = req.params;
    const user = await User.findOne({username: id})
    if (user) {
        res.send({
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                token: utils.generateToken(user)
        })
    } else {
        res.status(401).send({message: "user not found"})
    }
}))

userRouter.put("/profile/:id/update", utils.isAuth, expressasynchandler(async(req, res)=>{
    const {id} = req.params;
    const user = await User.findOne({username: id})
    if (user) {
        const { fullName, username, dob, profilepic, email} = req.body;
        user.name = fullName;
        user.username = username;
        user.dob = dob;
        user.picture = profilepic
        user.email = email;
        const updatedUser = await user.save();
        res.status(200).send({message: "User Updated Successful", updatedUser})
    } else {
        res.status(401).send({message: "user not found"})
    }
}))



module.exports = userRouter;