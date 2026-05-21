const Property=
require("../models/Property");


const getRecommendations=
async(user)=>{


let keyword="";


/*
Latest searched keyword
*/

if(
user.searchHistory.length>0
){

keyword=

user.searchHistory[
user.searchHistory.length-1
];

}


/*
Find similar properties
*/

const properties=

await Property.find({

$or:[

{

city:{

$regex:keyword,

$options:"i"

}

},

{

location:{

$regex:keyword,

$options:"i"

}

}

]

})

.limit(5);


return properties;

};


module.exports=
getRecommendations;