const jwt=require('jsonwebtoken')
const User=require('../models/user')



const authrole=async(req, res, next)=>{
    // console.log("REQ",req.user.role);
    try{
        const user= req.user
        // console.log("HERE",user)
        if(!user.role=='admin'){
            throw new Error()
        }
        next();

    }
    catch(e){
        res.status(401).send({error:"This route does not exist"})
    }
}

module.exports=authrole