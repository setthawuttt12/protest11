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

const pf = require('./routes/profile')
app.use('/api/profile',pf)

const auth = require('./routes/auth')
app.use('/api/auth',auth)

const doc = require('./routes/docnoe')
app.use('/api/docnoe',doc)

const dash = require('./routes/dash')
app.use('/api/dash',dash)

//eva


//commit
const show_eva = require('./routes/Commit/show_eva')
app.use('/api/Commit/show_eva',show_eva)

const score_member2 = require('./routes/Commit/score_member')
app.use('/api/Commit/score_member',score_member2)

const save_score = require('./routes/Commit/save_score')
app.use('/api/Commit/save_score',save_score)

const check_confirm = require('./routes/Commit/check_confirm')
app.use('/api/Commit/check_confirm',check_confirm)

const sig = require('./routes/commit/signature')
app.use('/api/Commit/signature',sig)


const scorem = require('./routes/Eva/score_member')
app.use('/api/Eva/score_member',scorem)

const scorec = require('./routes/Eva/score_commit')
app.use('/api/Eva/score_commit',scorec)

const edit = require('./routes/Eva/editeva')
app.use('/api/Eva/editeva',edit)

app.use((req,res)=> res.status(404).json({message:'route not found'}))
app.listen(3001,()=>{
    console.log("Server running on Port 3001");
    
})