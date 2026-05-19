const cloudinary=
require("../config/cloudinary");



exports.uploadImage=
async(req,res)=>{

try{

if(!req.file){

return res.status(400).json({

success:false,

message:"No file uploaded"

});

}


const result=
await cloudinary.uploader.upload(

req.file.path,

{

folder:"real-estate"

}

);


res.status(200).json({

success:true,

message:"Image uploaded",

imageUrl:result.secure_url,

publicId:result.public_id

});


}

catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};