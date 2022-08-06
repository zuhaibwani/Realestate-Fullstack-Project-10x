const mongoose = require("mongoose");
const sequencingProperty = require("../config/sequencingProperty");
const validator = require("validator");

// const random_views = Math.floor((Math.random()*100)+1);
// let random_days;
// const arr=['Sold','Unsold']
// const random_string= arr[Math.floor(Math.random()*arr.length)];
// if(random_string==="Sold")
// {
//     random_days=0;
// }
// else if(random_string==="Unsold")
// {
//     random_days = Math.floor((Math.random()*100)+1);
// }

const propertySchema = new mongoose.Schema({
    // BASIC INFO
    //-----------------------------------------------
    _id: Number,
    property_type:{
        type:String,
        required:true
    },
    negotiable:{
        type:String,
        required:true
    },
    ownership:{
        type:String,
        required:true
        
    },
    price:{
        type:Number,
        required:true

    },
    property_age:{
        type:String,
        required:true
    },
    property_approved:{
        type:String,
        required:true
        
    },
    property_description:{
        type:String,
        required:true
    },
    bank_loan:{
        type:String,
        required:true
        
    },
    //PROPERTY DETAILS
    //-----------------------------------
    length:{
        type:Number,
        required:true
        
    },
    breadth:{
        type:Number,
        required:true
        
    },
    total_area:{
        type:Number,
        required:true
        
    },
    area_unit:{
        type:String,
        required:true
        
    },
    no_of_bhk:{
        type:String,
        required:true
        
    },
    no_of_floors:{
        type:Number,
        required:true
        
    },
    attached:{
        type:String,
        required:true
        
    },
    western_toilet:{
        type:String,
        required:true
        
    },
    furnished:{
        type:String,
        required:true
        
    },
    car_parking:{
        type:String,
        required:true
        
    },
    lift:{
        type:String,
        required:true
        
    },
    electricity:{
        type:String,
        required:true
        
    },
    facing:{
        type:String,
        required:true
        
    },
    name:{
        type:String,
        required:true,
        min:2
        
    },
    mobile:{
        type:Number,
        required:true
    },
    posted_by:{
        type:String,
        required:true
        
    },
    sale_type:{
        type:String,
        required:true
        
    },
    featured_package:{
        type:String,
        required:true
        
    },
    ppd_package:{
        type:String,
        required:true
        
    },
    image:{
        type:String
        // required:true
        
    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error("Invalid Email")
            }
        }
        
    },
    city:{
        type:String,
        required:true
        
    },
    area:{
        type:String,
        required:true
        
    },
    pincode:{
        type:Number,
        required:true,
        min:6
        
    },
    address:{
        type:String,
        required:true
        
    },
    landmark:{
        type:String,
        required:true
        
    },
    latitude:{
        type:Number,
        required:true
        
    },
    longitude:{
        type:Number,
        required:true
        
    },
    views:{
        type:Number,
        // default:random_views
        
    },
    status:{
        type:String,
        // default:random_string
        
    },
    days_left:{
        type:Number,
        // default:random_days
        
    }

});

propertySchema.pre("save", function (next) {
    let doc = this;
    sequencingProperty.getSequenceNextValue("user_id").
    then(counter => {
        console.log("asdasd", counter);
        if(!counter) {
            sequencingProperty.insertCounter("user_id")
            .then(counter => {
                doc._id = counter;
                console.log(doc)
                next();
            })
            .catch(error => next(error))
        } else {
            doc._id = counter;
            next();
        }
    })
    .catch(error => next(error))
});

const propertyModal = new mongoose.model('propertyDetail',propertySchema);
module.exports = propertyModal;