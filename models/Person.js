const mongoose=require('mongoose');

//Person Scehma for creating table
const persondata=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','owner','manager']
    },
    address:{
        type:String,
        required:true
    },
    mobileNumber:{
    type:Number,
    required:true
    },
    Salary:{
        type:Number
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
    
})

const Person=mongoose.model('Person',persondata)
module.exports=Person;