const express = require("express");
const propertyModal = require("../models/propertySchema");
const router = express.Router();
const jwt = require('jsonwebtoken');
const signupModal = require("../models/signupSchema")
// const Authenticate = require("../middleware/Authenticate")


router.post("/addproperty", async(req,res)=>{
    try{
        const property = new propertyModal(req.body);
        const createProperty = await property.save();
        res.status(201).send(createProperty);
    }
    catch(e){
        res.status(400).send("Error in catch");
        console.log(e)
    }
});

router.get("/property", async (req,res)=>{
    // res.status(200).send("property GET route")
    // console.log(`This is cookie from backend ${req.headers.authorization}`)

    // console.log("get route of property")
    try{
        const token = req.headers.authorization;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
        // console.log(verifyToken)
        if(verifyToken){
            // console.log(verifyToken)
            const userDetail = await signupModal.find({email : verifyToken }) 
            // console.log(userDetail)

            if(userDetail.length){
                const propertyData = await propertyModal.find();
                res.status(200).send({property:propertyData, userData : userDetail});
                // console.log(userDetail)
                
            }else{
                res.status(409).send("Unauthorized user")
            }
            // console.log(userDetail)

        }else{
            res.status(409).send("Unauthorized user")
        }
        
    }catch(err){
        console.log(err)
        res.status(400).send(err)
        // console.log(err)
    }
    
    
    // console.log(`This is cookie from backend ${req.headers.authorization}`)
    // console.log(`This is cookie-parser ${req.cookies.jwt}`)
    
    // try{
    //     const propertyData = await propertyModal.find();
    //     res.status(200).send({property:propertyData});

    // }
    // catch(e){
    //     res.status(400).send(e);
    // }
})


module.exports = router;