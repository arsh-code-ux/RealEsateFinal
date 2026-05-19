const Property = require("../models/Property");
const User = require("../models/User");

const ApiFeatures = require("../utils/apiFeatures");

const calculateDistance =
require("../utils/shortestPath");



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
images,
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



const resultPerPage=6;


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



await property.deleteOne();



res.status(200).json({

success:true,

message:
"Property deleted successfully"

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
Nearby Properties
GET:
/api/properties/nearby
========================================
*/

exports.nearbyProperties=
async(req,res)=>{

try{

const{

latitude,
longitude

}=req.query;


const properties=
await Property.find();


const nearby=

properties.filter(
(property)=>{


if(
!property.coordinates
)return false;


const distance=

calculateDistance(

parseFloat(latitude),

parseFloat(longitude),

property.coordinates.latitude,

property.coordinates.longitude

);


return distance<=5;

});


res.status(200).json({

success:true,

count:
nearby.length,

data:nearby

});

}

catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};