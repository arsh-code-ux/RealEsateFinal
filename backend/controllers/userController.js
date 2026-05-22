const User=require("../models/User");
const Property=require("../models/Property");


exports.getProfile=async(req,res)=>{

try{

const user=await User.findById(
req.user._id
).select("-password");


res.status(200).json({

success:true,
data:user

});

}

catch(error){

res.status(500).json({

success:false,
message:error.message

});

}

};



exports.updateProfile=async(req,res)=>{

try{

const user=
await User.findByIdAndUpdate(

req.user._id,

req.body,

{
new:true,
runValidators:true
}

).select("-password");


res.status(200).json({

success:true,

message:
"Profile updated",

data:user

});

}

catch(error){

res.status(500).json({

success:false,
message:error.message

});

}

};



exports.addToWishlist=
async(req,res)=>{

try{

const propertyId=
req.params.propertyId;


const user=
await User.findById(
req.user._id
);


if(
user.wishlist.includes(
propertyId
)
){

return res.status(400)
.json({

success:false,

message:
"Already added"

});

}


user.wishlist.push(
propertyId
);

await user.save();


res.status(200)
.json({

success:true,

message:
"Added to wishlist"

});

}

catch(error){

res.status(500).json({

success:false,
message:error.message

});

}

};



exports.removeWishlist=
async(req,res)=>{

try{

await User.findByIdAndUpdate(

req.user._id,

{

$pull:{

wishlist:
req.params.propertyId

}

}

);


res.status(200).json({

success:true,

message:
"Removed"

});

}

catch(error){

res.status(500).json({

success:false,
message:error.message

});

}

};



exports.getWishlist=
async(req,res)=>{

try{

const user=

await User.findById(
req.user._id
)

.populate(
"wishlist"
);


res.status(200).json({

success:true,

data:
user.wishlist

});

}

catch(error){

res.status(500).json({

success:false,
message:error.message

});

}

};
