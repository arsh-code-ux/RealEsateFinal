const Message=
require("../models/Message");



const socketHandler=(io)=>{


io.on(
"connection",
(socket)=>{

console.log(
"User connected",
socket.id
);



socket.on(
"join",
(userId)=>{

socket.join(userId);

});



socket.on(

"sendMessage",

async(data)=>{

try{

const message=

await Message.create({

chat:data.chatId,

sender:data.senderId,

text:data.text

});


io.to(
data.receiverId
).emit(

"receiveMessage",

message

);

}

catch(error){

console.log(
error
);

}

});



socket.on(
"disconnect",

()=>{

console.log(
"user disconnected"
);

}

);

});

};

module.exports=
socketHandler;