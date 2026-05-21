const Chat=
require("../models/Chat");

const Message=
require("../models/Message");



/*
Create Chat
*/

exports.createChat=
async(req,res)=>{

try{

const{

receiverId

}=req.body;


/*
check existing
*/

let chat=

await Chat.findOne({

participants:{

$all:[
req.user._id,
receiverId
]

}

});


if(!chat){

chat=
await Chat.create({

participants:[
req.user._id,
receiverId
]

});

}


res.status(200).json({

success:true,

data:chat

});

}

catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};




/*
Get Messages
*/

exports.getMessages=

async(req,res)=>{

try{

const messages=

await Message.find({

chat:req.params.chatId

})

.populate(
"sender",
"name"
)

.sort({
createdAt:1
});


res.status(200).json({

success:true,

data:messages

});

}

catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};

exports.getChats=
async(req,res)=>{

try{

const chats=

await Chat.find({

participants:
req.user._id

})

.populate(
"participants",
"name email"
);


res.status(200)
.json({

success:true,

data:
chats

});

}

catch(error){

res.status(500)
.json({

success:false,

message:error.message

});

}

};



exports.sendMessage=
async(req,res)=>{

try{

const{

chatId,
text

}=req.body;


const message=

await Message.create({

chat:
chatId,

sender:
req.user._id,

text

});


res.status(201)
.json({

success:true,

data:
message

});

}

catch(error){

res.status(500)
.json({

success:false,

message:error.message

});

}

};

exports.sendMessage=
async(req,res)=>{

try{

const{
chatId,
text
}=req.body;


const chat=
await Chat.findById(chatId);

if(!chat){

return res.status(404)
.json({

success:false,

message:
"Chat not found"

});

}


const message=

await Message.create({

chat:chatId,

sender:req.user._id,

text

});


await Chat.findByIdAndUpdate(

chatId,

{

latestMessage:
message._id

}

);


res.status(201)
.json({

success:true,

data:message

});

}

catch(error){

res.status(500)
.json({

success:false,

message:error.message

});

}

};