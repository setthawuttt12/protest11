const mysql = require('mysql2')
const db = mysql.createConnection({
    host:'localhost',
    password:'1234',
    user:'root',
    database:'epic',
})

module.exports = db.promise()