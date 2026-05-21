const User=
require("../models/User");

const getRecommendations=
require(
"../services/recommendationService"
);



exports.recommendProperties=

async(req,res)=>{

try{

const user=

await User.findById(
req.user._id
);


const recommendations=

await getRecommendations(
user
);


res.status(200).json({

success:true,

data:
recommendations

});

}

catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};