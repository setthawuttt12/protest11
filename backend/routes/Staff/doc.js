const express = require('express')
const path =require('path')
const fs = require('fs')
const uploadDir = path.join(__dirname,'../../uploads/document')
const router = express.Router()
const db = require('../../db')
const {verifyToken,requireRole} = require('../../middleware/authmiddleware')


router.post('/save',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        
        const {name_doc} = req.body
        const file = req.files?.file
        const maxSize = 10*1024*1024
        if(file.size > maxSize){
            return res.status(403).json({message:"ไฟล์มีขนาดใหญ่เกิน 10MB"})
        }
        const filename = Date.now() + path.extname(file.name)
        await file.mv(path.join(uploadDir,filename))
        const [rows] = await db.query(`insert into tb_doc(name_doc,day_doc,file) values(?,CURDATE(),?)`,[name_doc,filename])
        res.json(rows,{message:"Save Success"})
    } catch (error) {
        console.error("Error save",error);
        res.status(500).json({message:"Error save"})
        
    }
})


router.delete('/delete/:id_doc',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        
        const {id_doc} = req.params
        const [[d]] = await db.query(`select file from tb_doc where id_doc = ?`,[id_doc])
        
        const fp = path.join(uploadDir,d.file)
        if(fs.existsSync(fp)){
            fs.unlinkSync(fp)
        }
        const [rows] = await db.query(`delete from tb_doc where id_doc=?`,[id_doc])
        res.json(rows,{message:"delete Success"})
        
        
    } catch (error) {
        console.error("Error delete",error);
        res.status(500).json({message:"Error delete"})
        
    }
})

router.get('/show',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {

        const [rows] = await db.query(`select * from tb_doc order by id_doc desc`)
        res.json(rows,{message:"show Success"})
    } catch (error) {
        console.error("Error show",error);
        res.status(500).json({message:"Error show"})
        
    }
})



module.exports = router