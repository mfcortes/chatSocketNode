const path = require('path')
const express = require('express')
const socketIo = require('socket.io')

const app = express()

//seting del app
app.set('port', process.env.PORT || 3007)
nuevo_path=path.resolve(__dirname,'..')
//Statics Files
app.use(express.static(path.join(nuevo_path,'public')))


console.log(`${nuevo_path}`)



const server = app.listen(app.get('port'),()=>{
    console.log(`Server on PORT ${app.get('port')}`)
})

//Web Socket
const io = socketIo(server)

io.on('connection',(socket)=>{
    console.log(`nueva Conexion con id Socket ${socket.id}`)
    socket.on('chat:mensaje',(data)=>{
        console.log('Data : ')
        console.dir(data)

        //Puedo contestasr a todos los usuarios 
        socket.emit('chat:mensaje', data)
    })

    socket.on('escribiendo:mensaje', (username)=>{
        console.log(`Esta Escriviendo ${username}`)
        // emitir a todos menos yo
        socket.broadcast.emit('escribiendo:mensaje', username)
    })
})