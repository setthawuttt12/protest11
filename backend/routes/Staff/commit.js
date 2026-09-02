const express = require('express')
const bc = require('bcrypt')
const router = express.Router()
const db = require('../../db')
const {verifyToken,requireRole} = require('../../middleware/authmiddleware')

router.post('/save/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        
        const {id_eva} = req.params
        await db.query(`delete from tb_commit where id_eva = ?`,[id_eva])
        const m = req.body
        const v = m.map(p=>[id_eva,p.id_member,p.role,'n']) 
        const [rows] = await db.query(`insert into tb_commit(id_eva,id_member,level_commit,status_commit) values ?`,[v])
        res.json(rows,{message:"Save Success"})
    } catch (error) {
        console.error("Error save",error);
        res.status(500).json({message:"Error save"})
        
    }
})

router.delete('/delete/:id_commit',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        
        const {id_commit} = req.params


        const [rows] = await db.query(`delete from tb_commit where id_commit = ?`,[id_commit])
        res.json(rows,{message:"delete Success"})
        
        
    } catch (error) {
        console.error("Error delete",error);
        res.status(500).json({message:"Error delete"})
        
    }
})



router.get('/member/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        const {id_eva} = req.params
        const [pick] = await db.query(`select id_member,concat(fname,'',lname)as fullname_commit from tb_member where role = 'กรรมการประเมิน'`)
        const [picked] = await db.query(`select m.id_member,id_commit,fname,lname,level_commit as role from tb_member m,tb_eva e,tb_commit c where c.id_eva = ? and c.id_eva = e.id_eva and c.id_member = m.id_member`,[id_eva])
        res.json({pick,picked})
    } catch (error) {
        console.error("Error show",error);
        res.status(500).json({message:"Error show"})
        
    }
})

router.get('/header/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        const {id_eva} = req.params
        const [rows] = await db.query(`select * from tb_member m,tb_system s,tb_eva e where e.id_eva = ? and e.id_sys = s.id_sys and e.id_member = m.id_member`,[id_eva])

        res.json(rows[0])
    } catch (error) {
        console.error("Error show",error);
        res.status(500).json({message:"Error show"})
        
    }
})


// router.get('/showC',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
//     try {

//         const [rows] = await db.query(`select * from tb_member where role='กรรมการประเมิน' order by id_member desc`)
//         res.json(rows,{message:"showC Success"})
//     } catch (error) {
//         console.error("Error showC",error);
//         res.status(500).json({message:"Error showC"})
        
//     }
// })


module.exports = router