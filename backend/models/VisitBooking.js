const mongoose=
require("mongoose");


const bookingSchema=

new mongoose.Schema({

property:{

type:
mongoose.Schema.Types.ObjectId,

ref:"Property"

},

tenant:{

type:
mongoose.Schema.Types.ObjectId,

ref:"User"

},

visitDate:Date,

status:{

type:String,

enum:[

"pending",
"approved",
"cancelled"

],

default:"pending"

}

},
{
timestamps:true
});


module.exports=
mongoose.model(

"VisitBooking",

bookingSchema

);