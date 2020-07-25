const socket = io.connect('http://localhost:4000')

const message= document.getElementById('message');
var btn = document.getElementById('send') ;
const handle = document.getElementById('handle');
const output = document.getElementById('output'); 
const feedback= document.getElementById('feedback')

message.addEventListener('keypress',()=>{
    socket.emit('typing', handle.value)
});

btn.addEventListener('click', ()=>{
    socket.emit('chat',{
        message: message.value,
        handle : handle.value
    })
    message.value=''
});



socket.on('chat', (data)=>{
    output.innerHTML += '<p><strong>'+data.handle+': </strong>' + data.message+ '</p>'
    feedback.innerHTML=''
})

socket.on('typing',(data)=>{
    feedback.innerHTML='<p> <em>'+ data + " is typing a message... </em></p>"
})