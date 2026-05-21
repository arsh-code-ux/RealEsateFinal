const express=
require("express");

const router=
express.Router();

const protect=
require(
"../middleware/authMiddleware"
);


const{

createReview,

getReviews,

deleteReview

}=require(
"../controllers/reviewController"
);


/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Add review
 *     tags:
 *       - Reviews
 */

router.post(
"/",
protect,
createReview
);


router.get(
"/:propertyId",
getReviews
);


router.delete(
"/:id",
protect,
deleteReview
);


module.exports=
router;