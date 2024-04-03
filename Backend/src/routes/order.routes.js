import { Router } from "express";

import {
    orderItems

} from "../controllers/order.controller.js"

import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/").post(verifyJWT, orderItems)


export default router