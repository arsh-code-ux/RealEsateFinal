

function calculateDistance(

lat1,
lon1,

lat2,
lon2

){

const R=6371;


const dLat=

(lat2-lat1)
*Math.PI/180;


const dLon=

(lon2-lon1)
*Math.PI/180;


const a=

Math.sin(dLat/2)
*
Math.sin(dLat/2)

+

Math.cos(
lat1*Math.PI/180
)

*

Math.cos(
lat2*Math.PI/180
)

*

Math.sin(dLon/2)

*

Math.sin(dLon/2);


const c=

2*
Math.atan2(
Math.sqrt(a),
Math.sqrt(1-a)
);


return R*c;

}


module.exports=
calculateDistance;


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

property=>{

const distance=

calculateDistance(

latitude,
longitude,

property.coordinates.latitude,

property.coordinates.longitude

);


return distance<5;

}

);


res.json({

success:true,

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