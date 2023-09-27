const express = require('express');
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

const PORT=process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log('server is up on port '+PORT);
})
