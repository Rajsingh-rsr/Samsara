import { Router } from "express";

import {
    removeSeller,
    AllSeller
} from "../controllers/admin.controller.js"

import { verifyJWT } from "../middlewares/auth.middleware.js";



const router = Router()

router.use(verifyJWT)

router.route("/remove/user/:userId").delete(removeSeller)
router.route("/allseller").get(AllSeller)


export default router