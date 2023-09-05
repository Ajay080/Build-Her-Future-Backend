const jwt=require('jsonwebtoken')
// const { findOne } = require('../models/user')
const User=require('../models/user')


const auth=async(req, res, next)=>{
    try{
        const token=req.header('Authorization').replace('Bearer ','')
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        console.log("DECODED",decoded)
        const user=await User.findOne({_id:decoded._id})
        console.log("USER ", user)
        if(!user){
            throw new Error()
        }
        req.token=token
        req.user=user
 
        next();

    }
    catch(e){
        res.status(401).send({error:"please authenticate the token"})
    }
}

module.exports=auth