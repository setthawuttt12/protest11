require('dotenv').config({path:'.env'})
const cors = require('cors')
const express = require('express')
const fileUp = require('express-fileupload')
const path = require('path')
const app = express()

app.use(cors(
    {
        origin:'http://localhost:3000',
        credentials: true
    }
))

app.use(fileUp())
app.use(express.json())
app.use('/uploads',express.static(path.join(__dirname,'./uploads')))

const auth = require('./routes/auth')
app.use('/api/auth',auth)

const profile = require('./routes/profile')
app.use('/api/profile',profile)

// staff
const member =require('./routes/Staff/member')
app.use('/api/Staff/member',member)

const topic =require('./routes/Staff/topic')
app.use('/api/Staff/topic',topic)

const indicate =require('./routes/Staff/indicate')
app.use('/api/Staff/indicate',indicate)

const round =require('./routes/Staff/round')
app.use('/api/Staff/round',round)

const eva =require('./routes/Staff/eva')
app.use('/api/Staff/eva',eva)

app.use((req,res)=> res.status(404).json({message:'route not found'}))
app.listen(3001,()=>{
    console.log("Server running on Port 3001");
    
})