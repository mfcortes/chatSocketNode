console.log('Chat COn Socket.io')

const socket = io() // Si tiene problemas dar LINK HTTP

//DOM ELEMENT
const mensaje = document.getElementById('mensaje')
const username = document.getElementById('username')
const accion = document.getElementById('acctions')
const output = document.getElementById('output')
const btn = document.getElementById('enviar')

btn.addEventListener('click',()=>{
    const objeto = {
        username: username.value,
        mensaje: mensaje.value
    }
    console.log(`Se estan ingresando valor ${objeto.username}`)

    socket.emit('chat:mensaje', objeto)
})

mensaje.addEventListener('keypress', ()=>{
    socket.emit('escribiendo:mensaje', username.value)
})

socket.on('chat:mensaje',(data)=>{
    accion.innerHTML = '' 
    console.log('Se reciben datos del Servidor')
    console.dir(data)
    output.innerHTML  += ` 
        <p> 
          <strong>${data.username}</strong> : ${data.mensaje}
        </p>
        `
})

socket.on('escribiendo:mensaje',(data)=>{

    accion.innerHTML = `<p><em> ${data} esta esccribiendo un mensaje</p>`
})

