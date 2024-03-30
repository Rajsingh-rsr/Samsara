import { Router } from "express";

import {
    addNewProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    updatePrice,
    getProductById
} from "../controllers/product.controller.js"

import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";




const router = Router()
router.use(verifyJWT)

router.route("/")
    .post(
        upload.fields([
            {
                name: "productImage",
                maxCount: 1
            },
            {
                name: "supportImage",
                maxCount: 4
            }
        ]),
        addNewProduct
    )

router.route("/:productId")
    .get(getProductById)
    .patch(updateProduct)
    .delete(deleteProduct)

router.route("/update-stock/:productId").patch(updateStock)
router.route("/update-price/:productId").patch(updatePrice)



export default router