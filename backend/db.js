const mysql2 = require('mysql2')
const db = mysql2.createConnection({
    host:'localhost',
    user:'root',
    port:'3307',
    password:'1234',
    database:'protest11'
})

module.exports = db.promise()