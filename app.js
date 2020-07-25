const express = require('express');
const socket = require('socket.io')
const session = require('express-session');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app= express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 3000000,
      sameSite: true,
    },
  }));  


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

app.use('/', require('./routes/home_chatroom'));
app.use('/login',require('./routes/loginxlogout'));
app.use('/register', require('./routes/register'));