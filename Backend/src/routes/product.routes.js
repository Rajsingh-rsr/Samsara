import { Router } from "express";

import {
    addNewProduct
} from "../controllers/product.controller.js"

import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";




const router = Router()

router.route("/add-product").post(
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


export default router