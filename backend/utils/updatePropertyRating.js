const Review=
require("../models/Review");

const Property=
require("../models/Property");


const updatePropertyRating=
async(propertyId)=>{

const reviews=

await Review.find({

property:
propertyId

});


let avg=0;


if(reviews.length){

avg=

reviews.reduce(

(acc,item)=>

acc+
item.rating,

0

)

/reviews.length;

}


await Property
.findByIdAndUpdate(

propertyId,

{

rating:avg,

reviewsCount:
reviews.length

}

);

};


module.exports=
updatePropertyRating;