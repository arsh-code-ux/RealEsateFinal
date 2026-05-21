const User=
require("../models/User");

const Property=
require("../models/Property");

const Payment=
require("../models/Payment");

const Review=
require("../models/Review");



exports.getAllUsers=
async(req,res)=>{

try{

const users=
await User.find();

res.status(200)
.json({

success:true,

count:
users.length,

data:
users

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




exports.getAllProperties=
async(req,res)=>{

try{

const properties=
await Property.find();

res.status(200)
.json({

success:true,

count:
properties.length,

data:
properties

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

exports.analytics=
async(req,res)=>{

try{

const users=
await User.countDocuments();

const properties=
await Property.countDocuments();

const payments=
await Payment.countDocuments();

const reviews=
await Review.countDocuments();


res.status(200)
.json({

success:true,

stats:{

users,
properties,
payments,
reviews

}

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



