const express = require('express')

var port = process.env.PORT || 8080;

const request = require('request')
const cors = require('cors')

const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use((req, res, next) => {
    req.io = io

    return next()
})

app.use(cors())
app.use(express.json())
app.use(require('./routes'))

server.listen(port, () => {
    console.log("Server started on port "+port)
})