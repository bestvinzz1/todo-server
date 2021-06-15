const express = require('express')
const cors = require('cors')

const app = express()
const routerTodos = require('./router/todo.js')
const routerUsers = require('./router/user')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

app.use(routerTodos)
app.use(routerUsers)

app.listen(3000, () => {
    console.log('Server Running Port : 3000')
})