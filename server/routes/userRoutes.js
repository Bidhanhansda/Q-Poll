const router = require("express").Router();
require("dotenv").config();
const Jwt =require("jsonwebtoken");

const User = require("../models/User");

const jwtKey = `${process.env.JWT_KEY}`;

router.post("/signup",async (req,res)=>{
    try {
        const {name,email,password,picture} = req.body;
        console.log(req.body);
        const user = await User.create({name,email,password,picture});
        res.status(201).json(user);

    } catch (e) {
        if(e.code == 11000){
            msg="User already Exist";
        }else{
            msg = e.message;
        }
        console.log(e);
        res.status(400).json(msg);
    }
})


router.post("/login",async (req,res)=>{
    
        const {email,password} = req.body;
        const user = await User.findByCredentials(email,password);
        // user.status = "online";
        // await user.save();
        if(user){
            Jwt.sign({user},jwtKey,{expiresIn:"2h"},(err,token)=>{
                if(err){
                    res.send({result:"error occurd"})
                }
                res.send({user, auth:token});
            })
            
        }else{
            res.send({result:"No user found"})
        }
})


function verifyToken(req,res,next){
    let token = req.headers["authorization"];
    if(token){
        token = token.split(" ")[1]
       
        Jwt.verify(token,jwtKey,(err,valid)=>{
        if(err){
            res.status(401).send("token not valid")
        }else{
            next();
        }
        })
    }else{
        res.status(403).send("token not found")
    }
    
    
}

module.exports = router;