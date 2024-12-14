
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const JWT_PASSWORD = "kalpesh"

import { userModel } from "./db"


const app = express();
app.use(express.json());

app.post("/api/v1/signup", async (req,res) => {
    
    const username = req.body.username;
    const password = req.body.password;

    try {
        await userModel.create({
            username: username,
            password: password
        })

        res.json({
            msg: "signn up succeed"
        })
    } catch(e){
        res.status(411).json({
            message: "User already exist"
        })
    }
})

app.post("/api/v1/signin",async (req,res) => {
    const { username, password } = req.body;

    const user = await userModel.findOne({
        username: username,
        password: password
    })

    if(user){
        const token = jwt.sign({
            id: user._id
        },JWT_PASSWORD)

        res.json({
            token
        })
    }
    else{
        res.status(403).json({
            Message: "wrong credentials"
        })
    }

})

app.post("/api/v1/content", (req,res) => {

})

app.get("/api/v1/content", (req,res) => {

})

app.delete("/api/v1/content", (req,res) => {

})

app.post("/api/v1/brain/share", (req,res) => {

})

app.get("/api/v1/brain/:shareLink", (req,res) => {

})



app.listen(3000)