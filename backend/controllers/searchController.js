const Property=
require("../models/Property");

const editDistance=
require("../utils/editDistance");


exports.searchSuggestions=
async(req,res)=>{

try{

const keyword=
req.query.keyword;


if(!keyword){

return res.status(400)
.json({

success:false,

message:
"Keyword required"

});

}


const properties=

await Property.find()
.select(
"title city location"
);


const suggestions=[];


properties.forEach(
(property)=>{

const values=[

property.title,
property.city,
property.location

];


values.forEach(
(value)=>{

if(!value)return;


const distance=

editDistance(

keyword.toLowerCase(),

value.toLowerCase()

);


if(distance<=2){

suggestions.push(
value
);

}

});

});


const unique=[

...new Set(
suggestions
)

];


res.status(200)
.json({

success:true,

data:unique

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