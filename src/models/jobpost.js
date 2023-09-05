const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken');
const { Timestamp } = require('mongodb');
const User= require('./user')

const jobSchema= new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    role:{
        type:String,
        trim:true,
        default:"NA",
    },
    category:{
        type:String,
        trime:true,
        require:true,
    },
    url:{
        type:String,
        required:true,
   
        validate: {
            validator: function (value) {
              return /^(http|https):\/\/[^ "]+$/.test(value);
            },
            message: 'Invalid URL format',
          },
    },
    deadline:{
        type:Date,
        required:true,
        validate:{
            validator:function(value){
                return value instanceof Date;
            },
            message:'Invalid date format',
        },
        
    },
    time:{
        type:String,
        require:true,
        validate:{
            validator:function(value){
                //Implement your own time format validation logic here
                return /^[0-2][0-9]:[0-5][0-9]$/.test(value);
            },
            message:'Invalid time format',
        }
    }},
    {
        timestamps:true,
    }
);
// jobSchema.methods.toJSON=function(){
//     const job=this
//     const jobObject= job.toObject()
//     // delete userObject.tokens
//     // delete userObject.password
//     return jobObject
// }

const Job=mongoose.model('Job', jobSchema)

module.exports=Job