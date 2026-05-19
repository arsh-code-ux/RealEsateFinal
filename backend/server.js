require("dotenv").config();

const http=
require("http");

const app=
require("./app");

const connectDB=
require("./config/db");

const socketio=
require("socket.io");

const socketHandler=

require(
"./sockets/socketHandler"
);

connectDB();


const server=
http.createServer(app);


const io=
socketio(server,{

cors:{

origin:"*"

}

});


socketHandler(io);


const PORT=
process.env.PORT||5000;


server.listen(

PORT,

()=>{

console.log(

`Server running on ${PORT}`

);

}

);