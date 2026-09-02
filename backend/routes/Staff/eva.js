const express = require('express')
const bc = require('bcrypt')
const router = express.Router()
const db = require('../../db')
const {verifyToken,requireRole} = require('../../middleware/authmiddleware')

router.post('/save',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        
        const {id_member,id_sys,day_eva,status_eva} = req.body
        
        const [rows] = await db.query(`insert into tb_eva(id_member,id_sys,day_eva,status_eva) values(?,?,?,?)`,[id_member,id_sys,day_eva,1])
        res.json(rows,{message:"Save Success"})
    } catch (error) {
        console.error("Error save",error);
        res.status(500).json({message:"Error save"})
        
    }
})

router.put('/update/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        
        const {id_eva} = req.params
        const {id_member,id_sys,day_eva,status_eva} = req.body

        const [rows] = await db.query(`update tb_eva set id_member=?,id_sys=?,day_eva=?,status_eva=? where id_eva = ?`,[id_member,id_sys,day_eva,status_eva,id_eva])
        res.json(rows,{message:"update Success"})

        
        
    } catch (error) {
        console.error("Error update",error);
        res.status(500).json({message:"Error update"})
        
    }
})

router.delete('/delete/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        
        const {id_eva} = req.params


        const [rows] = await db.query(`delete from tb_eva where id_eva = ?`,[id_eva])
        res.json(rows,{message:"delete Success"})
        
        
    } catch (error) {
        console.error("Error delete",error);
        res.status(500).json({message:"Error delete"})
        
    }
})

router.get('/show',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {

        const [rows] = await db.query(`select * from tb_system s,tb_eva e , tb_member m where e.id_member = m.id_member and e.id_sys = s.id_sys  order by id_eva desc`)
        res.json(rows,{message:"show Success"})
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