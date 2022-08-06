const express = require("express")
const mongoose = require("mongoose")
const app = express();
const propertyController = require("./routes/propertyRoutes");
const signupLoginController = require("./routes/signupLoginRoute")
const PORT = process.env.PORT || 5000 ;
const cors = require("cors")
const cookieParser = require('cookie-parser')
require('dotenv').config()
const DB = process.env.MONGO_DB

//MIDDLEWARES
app.use(cors())
app.use(express.json({limit: "30mb", extended:true}));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());


mongoose.connect(`${DB}`, ()=>{
    console.log("Successfully connected to database!")
}, (err)=>{
    console.log(err)
})


app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin : https://realestate-srz.herokuapp.com");
    next();
});

app.listen(PORT, (err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("Listening to server at port 5000")
    }
    
})

//PROPERTY ROUTES
app.use(propertyController);
//LOGIN ROUTES
app.use(signupLoginController);

app.get("/", (req, res)=>{
    res.status(200).send("Realestate Backend server zw")
})


