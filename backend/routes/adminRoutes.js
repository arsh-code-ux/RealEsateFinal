const express=
require("express");

const router=
express.Router();

const protect=
require(
"../middleware/authMiddleware"
);

const role=
require(
"../middleware/roleMiddleware"
);


const{

getAllUsers,
getAllProperties,
analytics

}=require(
"../controllers/adminController"
);



router.get(

"/users",

protect,

role("admin"),

getAllUsers

);


router.get(

"/properties",

protect,

role("admin"),

getAllProperties

);


router.get(

"/analytics",

protect,

role("admin"),

analytics

);


module.exports=
router;