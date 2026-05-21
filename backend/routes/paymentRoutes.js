const express=
require("express");

const router=
express.Router();

const protect=
require(
"../middleware/authMiddleware"
);


const{
createOrder,
verifyPayment,
paymentHistory,
landlordPayments

}=require(
"../controllers/paymentController"
);



router.post(

"/create-order",

protect,

createOrder

);


router.post(

"/verify",

protect,

verifyPayment

);

router.get(
"/history",
protect,
paymentHistory
);


router.get(
"/landlord-history",
protect,
landlordPayments
);


module.exports=
router;