const express=
require("express");

const router=
express.Router();

const protect=
require("../middleware/authMiddleware");


const{

getProfile,
updateProfile,

addToWishlist,
removeWishlist,
getWishlist

}=require(
"../controllers/userController"
);


router.get(
"/profile",
protect,
getProfile
);

router.put(
"/profile",
protect,
updateProfile
);


router.post(
"/wishlist/:propertyId",
protect,
addToWishlist
);


router.delete(
"/wishlist/:propertyId",
protect,
removeWishlist
);


router.get(
"/wishlist",
protect,
getWishlist
);


module.exports=
router;