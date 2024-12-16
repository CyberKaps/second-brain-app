
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const JWT_PASSWORD = "kalpesh"
import { userMiddleware } from "./middleware";

import { contentModel, linkModel, userModel } from "./db"
import { random } from "./utils";


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

app.post("/api/v1/content",userMiddleware,async (req,res) => {
    const {link, type, title } = req.body;

    await contentModel.create({
        link,
        type,
        title,
        tags: [],
        //@ts-ignore
        userId: req.userId

    })
    res.json({
        message: "Content added"
    })

})

app.get("/api/v1/content",userMiddleware, async (req,res) => {
    //@ts-ignore
    const userId = req.userId;
    const content = await contentModel.find({
        userId: userId
    }).populate("userId", "username")
    res.json({
        content
    })

})

app.delete("/api/v1/content",userMiddleware, async (req,res) => {

    const contentId = req.body.contentId;

    await contentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId: req.userId
    })
    res.json({
        message: "deleted"
    })

})

app.post("/api/v1/brain/share",userMiddleware, async (req,res) => {
    const {share} = req.body;
    if (share) {

        const existingHash = await linkModel.findOne({
            //@ts-ignore
            userId: req.userId
        })

        if(existingHash){
            res.json({
                hash: existingHash.hash
            })
            return;
        }

        const hash = random(10)
        await linkModel.create({
            //@ts-ignore-
            userId: req.userId,
            hash: hash

        })
        res.json({
             hash
        })
    } else {
        await linkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
        })
        res.json({
            message: "removed link"
        })
    }
    

})

app.get("/api/v1/brain/:shareLink", async (req,res) => {
    const hash = req.params.shareLink;

    const link = await linkModel.findOne({
        hash: hash

    });
    if (!link) {
        res.status(411).json({
            message: "sorry incorrect input"
        })
        return;
    } 
    

    const content = await contentModel.find({
        
        userId: link.userId
    })
    const user = await userModel.findOne({
        _id: link.userId

    })

    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        })
        return;
    } 

    res.json({
        //@ts-ignore
        username: user.username,
        content: content
    })
    

})



app.listen(3000)