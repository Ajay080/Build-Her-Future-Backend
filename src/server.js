const express = require('express');
// const axios = require('axios');
// const cheerio = require('cheerio');
const cors = require('cors')
require("dotenv").config();
require('./db/mongoose')

const userRouter=require('./routers/user')
const jobRouter=require('./routers/jobpost')
const app = express();

app.use(express.json())

app.use(cors());

app.use(userRouter)
app.use(jobRouter)
// app.use(userRouter) this was creating the problem that app.use() requires middleware function



app.get("/api", (req, res)=>{
        res.send({"users":["userOne","userTwo","userThree"]})
    })
app.listen(8000,()=>{
    console.log('server is up on port 8000')
})
