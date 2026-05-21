const crypto=
require("crypto");

const razorpay=
require("../config/razorpay");

const Payment=
require("../models/Payment");



/*
Create Razorpay Order
*/

exports.createOrder=

async(req,res)=>{

try{

const{

amount,
propertyId

}=req.body;


const options={

amount:
amount*100,

currency:"INR",

receipt:
`receipt_${Date.now()}`

};


const order=

await razorpay.orders.create(
options
);



await Payment.create({

user:req.user._id,

property:propertyId,

amount,

paymentStatus:
"pending",

razorpayOrderId:
order.id

});


res.status(200).json({

success:true,

order

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
Verify Payment
*/

exports.verifyPayment=

async(req,res)=>{

try{

const{

razorpay_order_id,

razorpay_payment_id,

razorpay_signature

}=req.body;



const body=

razorpay_order_id+

"|"+

razorpay_payment_id;



const expected=

crypto

.createHmac(

"sha256",

process.env
.RAZORPAY_KEY_SECRET

)

.update(body)

.digest("hex");



if(
expected!==razorpay_signature
){

return res.status(400)
.json({

success:false,

message:
"Payment verification failed"

});

}



await Payment.findOneAndUpdate(

{
razorpayOrderId:
razorpay_order_id
},

{

paymentStatus:
"success",

razorpayPaymentId:
razorpay_payment_id

}

);



res.status(200).json({

success:true,

message:
"Payment successful"

});

}

catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};

exports.paymentHistory=
async(req,res)=>{

try{

const payments=

await Payment.find({

user:req.user._id

});

res.status(200)
.json({

success:true,

data:payments

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



exports.landlordPayments=
async(req,res)=>{

try{

const payments=

await Payment.find({

landlord:
req.user._id

});


res.status(200)
.json({

success:true,

data:payments

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