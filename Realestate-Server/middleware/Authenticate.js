const jwt = require('jsonwebtoken');
const signupModal = require("../models/signupSchema")

const Authenticate = async(req, res, next)=>{
    try{
        const token = req.headers.authorization;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
        if(verifyToken){
            const userDetail = await signupModal.find({email : verifyToken })
            // console.log(verifyToken)

            if(userDetail.length){
                // res.status(205).send( userDetail)
                console.log(userDetail)
                next()
            }else{
                res.status(409).send("User not found")
            }
            // console.log(userDetail)

        }else{
            res.status(409).send("User not Authorized")
        }
        
    } catch(err){
        res.status(409).send("Unauthorized user")
        // console.log(err)
    }
    

}

module.exports = Authenticate;