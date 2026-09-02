// const express = require('express')
// const db = require('../../db')
// const router = express.Router()
// const {verifyToken,requireRole} = require('../../middleware/authmiddleware')
// const path = require('path')
// const uploadDir = path.join(__dirname,'../../uploads/evadetil')


// router.get('/user',verifyToken,requireRole('ผู้รับการประเมินผล'),async(req,res)=>{
//     try {
//         const id_member = req.user.id_member
//         const [rows] = await db.query(`select * from tb_member m,tb_eva e,tb_system s where e.id_member and e.id_member=m.id_member and e.id_sys=s.id_sys order by e.id_eva desc`,[id_member])
//         res.json(rows[0])
//     } catch (error) {
//         console.error('erorr Get user',error)
//         res.status(500).json({message:'error get user'})
//     }
// })

// router.get('/topic',verifyToken,requireRole('ผู้รับการประเมินผล')async(req,res)=>{
//     try {
//         const id_member = req.user.id_member
//         const [topics] = await db.query(`select * from tb_topic`)
//         const [indicates] = await db.query(`select * from tb_indicate`)
//         const result = topics.
//     } catch (error) {
        
//     }
// })

// module.exports = router