const express=
require("express");

const router=
express.Router();

const protect=
require(
"../middleware/authMiddleware"
);

const{

createBooking,
getBookings

}=require(
"../controllers/bookingController"
);



router.post(
"/",
protect,
createBooking
);


router.get(
"/",
protect,
getBookings
);


module.exports=
router;