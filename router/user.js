const express = require('express')
const router = express.Router()
const mysql = require('mysql')

router.use(express.json())
router.use(express.urlencoded())

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'develop'
})

conn.connect(function(err){
    if(err)
        throw err
})

router.get('/user', function (req, res) {
    res.send(`
        <html>
            <form action="/user" method="POST">
                <label>Username</label>
                <input name = "username"></input>
                <label>Password</label>
                <input name = "password" type = "password"></input>
                <button>Submit</button>
            </form>
        </html>
    `)
})

router.post('/user',function(req,res){
    const sql = `INSERT INTO users (username, password) VALUES (\'${req.body.username}\', \'${req.body.password}\')`
    conn.query(sql,function(err){
        if(err) 
            throw err
        console.log('User Added')
    })
    res.sendStatus(200)
})

router.get('/users',function(req,res){
    const sql = 'SELECT * FROM users'
    conn.query(sql,function(err,result){
        if(err)
            throw err
        res.send(result)
        console.log(result)
    })
})

router.delete('user/:id',function(req,res){
    const query = `DELETE FROM users WHERE id=\'${req.params.id}\'`
    conn.query(query,function(err,result){
        if(err)
            throw err
        res.send("User Deleted")
    })
})

module.exports = router