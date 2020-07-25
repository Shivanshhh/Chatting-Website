const express = require('express');
const socket = require('socket.io')
const bodyParser = require('body-parser');

const app= express();

app.use(express.static('public'));

dotenv.config();

mongoose.connect(process.env.mongo_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set('view engine', 'ejs');

const server = app.listen(4000,()=>{
    console.log('server listening on port 4000')
})

var io = socket(server)
io.on('connection', (socket) =>{
    console.log('connected')
    socket.on('chat',(data)=>{
        io.sockets.emit('chat',data);
    })
    socket.on('typing',(data)=>{
        socket.broadcast.emit('typing',data)
    })
});

app.get('/', (req,res)=>{
    res.render('index')
})
