const Review=
require("../models/Review");

const updatePropertyRating=
require(
"../utils/updatePropertyRating"
);



/*
==================================
Add Review
POST:
/api/reviews
==================================
*/

exports.createReview=
async(req,res)=>{

try{

const{

propertyId,
rating,
comment

}=req.body;


/*
Prevent duplicate review
*/

const alreadyReviewed=

await Review.findOne({

user:req.user._id,

property:propertyId

});


if(alreadyReviewed){

return res.status(400)
.json({

success:false,

message:
"Already reviewed"

});

}


/*
Create review
*/

await Review.create({

user:req.user._id,

property:propertyId,

rating,

comment

});


/*
Update property rating
*/

await updatePropertyRating(
propertyId
);


res.status(201)
.json({

success:true,

message:
"Review added"

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






/*
==================================
Get Property Reviews
GET:
/api/reviews/:propertyId
==================================
*/

exports.getReviews=
async(req,res)=>{

try{

const reviews=

await Review.find({

property:
req.params.propertyId

})

.populate(
"user",
"name"
)

.sort({
createdAt:-1
});



res.status(200)
.json({

success:true,

count:
reviews.length,

data:
reviews

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







/*
==================================
Delete Review
DELETE:
/api/reviews/:id
==================================
*/

exports.deleteReview=
async(req,res)=>{

try{


const review=

await Review.findById(
req.params.id
);


if(!review){

return res.status(404)
.json({

success:false,

message:
"Review not found"

});

}


/*
only owner
*/

if(

review.user.toString()

!==req.user._id.toString()

){

return res.status(403)
.json({

success:false,

message:
"Not authorized"

});

}


const propertyId=
review.property;


await review.deleteOne();


/*
Update property rating
*/

await updatePropertyRating(
propertyId
);


res.status(200)
.json({

success:true,

message:
"Review deleted"

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