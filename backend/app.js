const express = require("express")
const app =  express()
const bodyParser = require("body-parser")
const socket = require("socket.io")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const server = app.listen(3100, function(){
    console.log(3100)
})
// app.use(express.static('public'))
const io = socket(server)


io.on("connection", function(socket){
    console.log("made the connection", socket.id)

    socket.on("chat", function(data){
        io.sockets.emit("chat",data)
    })

    socket.on("typing", function(data){
        console.log(data)
        socket.broadcast.emit("typing", data)
    })

    })

