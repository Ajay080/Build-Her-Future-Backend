const express=require('express')
const Job= require('../models/jobpost')
const router= new express.Router();
const authrole=require('../middleware/authrole');
const auth = require('../middleware/auth');

router.post('/addblogs/newpost',auth, authrole, async(req, res)=>{
    const job=new Job(req.body)
    try{
        await job.save();
        res.status(201).send({job})
    }
    catch(error){
        res.status(400).send(error)
    }
})

router.get('/addblogs/getpost', async(req, res)=>{
    try{
        const job= await Job.find({});
        res.send(job)
    }
    catch(error){
        res.status(400).send(error)
    }
})

router.delete('/addblogs/deletepost/:id',  async(req, res)=>{
    const _id=req.params.id
    console.log("ID",_id);
    console.log("REQ",req.params);
    try{
        const job= await Job.findByIdAndDelete(_id)
        // const job=await Job.remove({_id:id})
        if(!job){
            return res.status(404).send()
        }
        res.send(job)
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.patch('/addblogs/editpost/:id',auth, authrole, async(req,res)=>{
    const _id=req.params.id
    const Updates=Object.keys(req.body)
    try{
        const editPost= await  Job.findById(_id)
        if(!editPost){
            return res.status(404).send()
        }
        Updates.forEach((update)=>{
            editPost[update]=req.body[update];
        })
        await editPost.save()
        res.send(editPost)
    }
    catch(e){
        res.status(400).send(e)
    }
})

module.exports=router