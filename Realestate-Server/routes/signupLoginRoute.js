const express = require("express");
const signupModal = require("../models/signupSchema")
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


//TO GENERATE OUR SECRET KET
//crypto.randomBytes(64).toString("hex")


router.post("/login", (req, res)=>{
    signupModal.find({email: req.body.email}).then((data)=>{
        if(!data.length){
            res.status(400).send("User doesn't exists!")
        }else{
            bcrypt.compare(req.body.password, data[0].password).then(function(result) {
                if(result){

                    const authToken = jwt.sign(data[0].email, process.env.SECRET_KEY)
                    // res.cookie("jwtoken", "thisIsSomeRandomCookieValuePassedThroughBackend", {
                    //     expires: new Date(Date.now()+100000),
                    //     httpOnly: true
                    // })
                    res.status(200).send({authToken})
                    
                }else{
                    res.status(400).send("Incorrect password")

                }
                
            });
        }   
    }).catch((err)=>{
        res.status(400).send(err)
    })
})

// router.post("/signup", (req, res)=>{
//     signupModal.find({email: req.body.email}).then((data)=>{
//         if(data.length){
//             res.status(400).send("User already exists!")
//         }else{
//             bcrypt.hash(req.body.password, saltRounds).then(function(hash) {
//                 // Store hash in your password DB.
//                 signupModal.create({email: req.body.email, password: hash, cpassword: hash}).then(()=>{
//                     res.status(200).send("User created successfully!")
//                 }).catch((err)=>{
//                     res.status(403).send(err)
//                 })
//             }).catch((err)=>{
//                 res.status(404).send(err)
//             });
            
//         }
//     })
    
// })

router.post("/signup", (req, res)=>{
    signupModal.find({email: req.body.email}).then((data)=>{
        if(data.length){
            res.status(400).send("User already exists!")
        }else{
            const newUser= new signupModal({...req.body})
            bcrypt.hash(req.body.password, saltRounds).then(function(hash) {
                // Store hash in your password DB.
                newUser.password =hash;
                newUser.cpassword =hash;
                newUser.save().then((data)=>{
                    res.status(200).send(data)
                }).catch((err)=>{
                    res.status(403).send(err)
                })
            }).catch((err)=>{
                res.status(404).send(err)
            });
            
        }
    })
    
})




module.exports = router;