import { Router } from "express";

import {
    registerUser,
    loginUser,
    logoutUser,

    updateAccountDetails
} from "../controllers/user.controller.js"

import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/register").post(upload.none(), registerUser);
router.route("/login").post(loginUser)

// secured routers
router.route("/logout").post(verifyJWT, logoutUser)


router.route("/update-account").patch(verifyJWT, updateAccountDetails)


export default router