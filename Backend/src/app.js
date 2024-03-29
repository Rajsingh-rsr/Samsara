import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import { ApiError } from "./utils/ApiError.js"
import { ApiResponse } from "./utils/ApiResponse.js"



const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())


// Router import 
import healthcheckRouter from "./routes/healthcheck.routes.js"
import userRouter from "./routes/user.routes.js"
import productRouter from "./routes/product.routes.js"




//routes declaration
app.use("/api/v1/healthcheck", healthcheckRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/product", productRouter)


app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
      return res.status(err.statusCode).json({
        statusCode:err.statusCode,
        message: err.message,
        success: false
       
      });
    }
  
    return res.status(500).json({
      success: false,
      message: 'Something went wrong on the server',
    });
  });

export default app 