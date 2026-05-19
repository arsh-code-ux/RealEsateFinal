const express=
require("express");

const router=
express.Router();

const protect=
require(
"../middleware/authMiddleware"
);

const{

recommendProperties

}=require(
"../controllers/recommendationController"
);


router.get(

"/",

protect,

recommendProperties

);


module.exports=
router;