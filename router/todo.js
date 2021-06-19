const express = require('express')
const router = express.Router()
const mysql = require('mysql')

// router.use(express.json())
// router.use(express.urlencoded())

const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'develop'
})

conn.connect(function(err){
    if(err)
        throw err
})

// router.get('/', function(req,res){
//     res.send(`
//         <form method="POST" action="/todo">
//             <input Name="Name"/>
//             <input type="submit" value="tambahkan"/>
//         </form>
//     `)
// })

router.post('/',function(req,res){
    const sql = `INSERT INTO data (Name) VALUES (\'${req.body.Name}\')`
    conn.query(sql,function(err){
        if(err) 
            throw err
        console.log('Data Added')
    })
    res.sendStatus(200)
})

router.get('/',function(req,res){
    const sql = 'SELECT * FROM data'
    conn.query(sql,function(err,result){
        if(err)
            throw err
        res.send(result)
        console.log(result)
    })
})

router.delete('/:Name',function(req,res){
    const query = `DELETE FROM data WHERE Name=\'${req.params.Name}\'`
    conn.query(query,function(err,result){
        if(err)
            throw err
        res.send("Deleted !")
    })
})

module.exports = router