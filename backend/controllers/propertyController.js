const Property = require("../models/Property");
const User = require("../models/User");
const mongoose = require("mongoose");

const ApiFeatures = require("../utils/apiFeatures");

const calculateDistance =
require("../utils/shortestPath");

const DEFAULT_PROPERTY_IMAGE = "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1973&auto=format&fit=crop";



/*
========================================
Create Property
POST:
/api/properties
========================================
*/

exports.createProperty =
async(req,res)=>{

try{

if(!req.user){

return res.status(401).json({

success:false,

message:"Not authorized"

});

}

const{

title,
description,
location,
city,
price,
propertyType,
amenities,
images,
coordinates

}=req.body;


const property =
await Property.create({

title,

description,
location,
city,
price,
propertyType,
amenities,
images: Array.isArray(images) && images.length > 0 ? images : [DEFAULT_PROPERTY_IMAGE],
coordinates,

landlord:req.user._id

});


res.status(201).json({

success:true,

message:
"Property created successfully",

data:property

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
========================================
Get All Properties
Search
Filter
Sort
Pagination
Search history
========================================
*/

exports.getProperties =
async(req,res)=>{

try{


/*
save user search history
*/

if(
req.user &&
req.query.keyword
){

await User.findByIdAndUpdate(

req.user._id,

{

$push:{

searchHistory:
req.query.keyword

}

}

);

}



const resultPerPage = req.query.limit ? Number(req.query.limit) : 100;

const apiFeatures=

new ApiFeatures(

Property.find()

.populate(
"landlord",
"name email"
),

req.query

)

.search()

.filter()

.sort()

.paginate(
resultPerPage
);



const properties=
await apiFeatures.query;


res.status(200).json({

success:true,

count:
properties.length,

data:
properties

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
========================================
Get Single Property
GET:
/api/properties/:id
========================================
*/


exports.getSingleProperty=

async(req,res)=>{

try{

if(!mongoose.isValidObjectId(req.params.id)){
  return res.status(404).json({
    success:false,
    message:'Property not found'
  })
}


const property=

await Property.findById(
req.params.id
)

.populate(
"landlord",
"name email"
);



if(!property){

return res.status(404)
.json({

success:false,

message:
"Property not found"

});

}



/*
save recently viewed
*/

if(req.user){

await User.findByIdAndUpdate(

req.user._id,

{

$push:{

recentlyViewed:
property._id

}

}

);

}



res.status(200).json({

success:true,

data:property

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
========================================
Update Property
PUT:
/api/properties/:id
========================================
*/


exports.updateProperty=

async(req,res)=>{

try{

const property=

await Property.findById(
req.params.id
);


if(!property){

return res.status(404)
.json({

success:false,

message:
"Property not found"

});

}


/*
owner check
*/

if(

property.landlord.toString()

!==req.user._id.toString()

){

return res.status(403)
.json({

success:false,

message:
"Not authorized"

});

}



const updated=

await Property.findByIdAndUpdate(

req.params.id,

req.body,

{

new:true,

runValidators:true

}

);



res.status(200).json({

success:true,

message:
"Property updated successfully",

data:updated

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
========================================
Delete Property
DELETE:
/api/properties/:id
========================================
*/

exports.deleteProperty=
async(req,res)=>{

try{

const property=
await Property.findById(req.params.id)

if(!property){
  return res.status(404).json({success:false,message:'Property not found'})
}

if(property.landlord.toString() !== req.user._id.toString()){
  return res.status(403).json({success:false,message:'Not authorized'})
}

await property.deleteOne()

res.status(200).json({
  success:true,
  message:'Property deleted successfully'
})

} catch(error){
  res.status(500).json({
    success:false,
    message:error.message
  })
}
}




/*
========================================
Nearby Properties
========================================
*/

exports.nearbyProperties=
async(req,res)=>{

try{

const property=
await Property.findById(req.query.propertyId)

if(!property){
  return res.status(404).json({success:false,message:'Property not found'})
}

const nearby=
await Property.find({
  _id:{ $ne: property._id }
}).limit(10)

res.status(200).json({
  success:true,
  count: nearby.length,
  data: nearby
})

}
catch(error){

res.status(500).json({

success:false,

message:error.message

})

}
}
