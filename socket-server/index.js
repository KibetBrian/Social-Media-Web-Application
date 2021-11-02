const io = require ("socket.io")(5500,
    {
    cors:
    {
        origin:"http://localhost:3000"
    }
});

let users = [];

const addUser = (userId, socketId)=>
{

    if (!users.some(userId=> users.userId === userId) )
    {
        users.push({userId, socketId})
    }
}
const removeUser = (socketId)=>
{
    users = users.filter(user=>user.socketId !==socketId);
}

const getUser = (userId)=>
{
    return users.find(user=>user.userId===userId)
}
io.on("connection", (socket)=>
{
    //On Connection
    console.log('Socket was connected');

    //Get user from the client and send back array with socketId
    socket.on('addUser', userId=>
    {
         addUser(userId, socket.id);
         io.emit('getUsers', users)
         console.log(users)
    });
    
    //Send and get message
    socket.on('sendMessage', ({senderId, receiverId, text})=>
    {
        const user = getUser(receiverId);
        io.to(user.socketId).emit('getMessage', {senderId, text})
    })

    //On disconnection
    socket.on("disconnect", ()=>
    {
        console.log('User Disconnected');
        removeUser(socket.id)
        io.emit('getUsers', users)
    })
    

})