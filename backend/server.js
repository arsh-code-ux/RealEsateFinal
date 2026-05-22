require("dotenv").config({ path: require("path").join(__dirname, ".env") });

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


server.on('error', (error) => {
	if (error.code === 'EADDRINUSE') {
		console.log(`Port ${PORT} is already in use. Backend is likely already running.`)
		process.exit(0)
	}

	throw error
})

server.listen(PORT, () => {
	console.log(`Server running on ${PORT}`)
})