const io=require('socket.io')(8000);

const users={}


io.on('connection',(socket)=>{
    socket.on('new-user-joined',(name)=>{
        users[socket.id]=name;  
        socket.broadcast.emit('user-joined',{name,users});
    })

    socket.on('send-message',(message)=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    })

    
    socket.on('disconnect-chat',(name)=>{
        socket.broadcast.emit('logout',{userName:users[socket.id],userList:users})
        delete users[socket.id];
    })

})

