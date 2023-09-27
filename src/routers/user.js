const express= require('express')
const User= require('../models/user')
const router= new express.Router();
const auth=require('../middleware/auth')


router.post('/users/signup', async(req, res)=>{ // route handler
    const user= new User(req.body)

    try{
        await user.save()
        const token=user.generateAuthToken();
        res.status(201).send({user, token})
    }
    catch(error){
        res.status(400).send(error)
    }
})

router.post('/users/login', async(req, res)=>{
    try{
        const user=await User.findByCredentials(req.body.email, req.body.password)
        const token= await user.generateAuthToken()
        return res.send({user, token})
    }
    catch(e){
        res.status(400).send(e);
    }
})

router.patch('/users/:id',async (req,res)=>{
    const _id=req.params.id 
    const Updates=Object.keys(req.body)
    const allowedUpdates=['name','email','password']

    const isValidOperation=Updates.every((update)=>{
        return allowedUpdates.includes(update)
    })

    if(!isValidOperation){
        return res.status(400).send({error:"Invalid Updates"})
    }

    try{
        const user=await User.findById(_id)
        Updates.forEach((update)=>user[update]=req.body[update])
        await user.save()
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch (e){
        res.status(400).send(e)
    }
})

// getting single user by unique id or getting multiple users
router.get('/users/me',auth,async (req,res)=>{
    res.send(req.user)
})



router.post('/users/logout',auth,async (req,res)=>{
    try{

        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token !== req.token
    
        })
        await req.user.save()
        res.send()
    }
    catch(e){
        res.status(500).send("not work")
    }
})

router.post('/users/logoutall',auth,async (req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.send()
    }
    catch(e){
        res.status(500).send()
    }
})

router.get('/users',auth,async (req,res)=>{
  try{
        const users=await User.find({})
        res.send(users)
    }
    catch(e){
        res.status(500).send(e)
    }
})


module.exports=router