class ApiFeatures{

constructor(query,queryString){

this.query=query;

this.queryString=queryString;

}



/*
Search
*/

search(){

if(this.queryString.keyword){

this.query=this.query.find({

$or:[

{
title:{
$regex:
this.queryString.keyword,

$options:"i"
}
},

{
location:{
$regex:
this.queryString.keyword,

$options:"i"
}
},

{
city:{
$regex:
this.queryString.keyword,

$options:"i"
}
}

]

});

}

return this;

}




/*
Filter
*/

filter(){

const queryCopy={
...this.queryString
};


const removeFields=[

"keyword",

"page",

"limit",

"sort"

];


removeFields.forEach(
el=>delete queryCopy[el]
);


let queryStr=

JSON.stringify(queryCopy);



queryStr=queryStr.replace(

/\b(gt|gte|lt|lte)\b/g,

match=>`$${match}`

);



this.query=
this.query.find(
JSON.parse(queryStr)
);


return this;

}



/*
Sorting
*/

sort(){

if(this.queryString.sort){

const sortBy=

this.queryString.sort
.split(",")

.join(" ");


this.query=
this.query.sort(sortBy);

}

else{

this.query=
this.query.sort("-createdAt");

}

return this;

}




/*
Pagination
*/

paginate(resultPerPage){

const currentPage=

Number(
this.queryString.page
)||1;


const skip=

resultPerPage*
(currentPage-1);


this.query=

this.query
.limit(resultPerPage)
.skip(skip);


return this;

}

}


module.exports=
ApiFeatures;