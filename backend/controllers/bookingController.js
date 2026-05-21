const Booking=
require(
"../models/VisitBooking"
);



exports.createBooking=
async(req,res)=>{

try{

const booking=

await Booking.create({

property:
req.body.property,

tenant:
req.user._id,

visitDate:
req.body.visitDate

});


res.status(201)
.json({

success:true,

data:
booking

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




exports.getBookings=
async(req,res)=>{

try{

const bookings=

await Booking.find({

tenant:
req.user._id

})

.populate(
"property"
);


res.status(200)
.json({

success:true,

data:
bookings

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