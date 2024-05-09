import { Router } from "express";

import {
    productReview,

} from "../controllers/review.controller.js"

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()


router.route("/:productId").post(verifyJWT, productReview)

export default router