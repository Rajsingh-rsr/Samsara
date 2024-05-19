import { Router } from "express";

import {
    orderItems,
    deliveredOrCancled,
    cancellOrder,
    OrderStatus,
    userOrderHistory,
    sellerOrderHistory

} from "../controllers/order.controller.js"

import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/").post(verifyJWT, orderItems)
router.route("/seller/:orderId").patch(verifyJWT, deliveredOrCancled)
router.route("/user/:orderId").patch(verifyJWT, cancellOrder)
router.route("/status/:status").get(verifyJWT, OrderStatus)
router.route("/user/orderHistory/:status").get(verifyJWT, userOrderHistory)
router.route("/seller/orderHistory/:status").get(verifyJWT, sellerOrderHistory)


export default router