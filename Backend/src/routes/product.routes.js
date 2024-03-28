import { Router } from "express";

import {
    addNewProduct,
    updateProduct
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

    .patch(updateProduct)

export default router