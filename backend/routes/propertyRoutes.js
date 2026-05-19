const express=require("express");

const router=express.Router();

const protect=
require("../middleware/authMiddleware");

const validate=require("../middleware/validationMiddleware");

const{

createProperty,
getProperties,
getSingleProperty,
updateProperty,
deleteProperty,
nearbyProperties

}=require(
"../controllers/propertyController"
);


/**
 * @swagger
 * /api/properties:
 *   get:
 *     summary: Get all properties
 *     tags:
 *       - Properties
 */

router.route("/")

.get(getProperties)

.post(
protect,
validate([

"title",
"price",
"city"

]),
createProperty
);

/*
Nearby route
IMPORTANT:
:id se pehle add karna
*/
router.get(
"/nearby",
nearbyProperties
);


router.route("/:id")

.get(getSingleProperty)

.put(
protect,
updateProperty
)

.delete(
protect,
deleteProperty
);


module.exports=router;