import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Ordre } from "../models/order.models.js"
import { Product } from "../models/product.models.js"

const orderItems = asyncHandler(async (req, res) => {

    const { phone, shippingAddress, paymentMethod, orderItem } = req.body


    if (paymentMethod !== "COD" && paymentMethod !== "ONLINE") {
        throw new ApiError(400, "Valid Payment Method is required")
    }

    if (
        [shippingAddress, phone].some((field) => field?.trim() === "" || field?.trim() === undefined)
    ) {
        throw new ApiError(400, "phone and shippingAddress are required")
    }

    const orderItemObj = JSON.parse(orderItem);
    const objLength = orderItemObj.length

    if (objLength === 0) {
        throw new ApiError(400, "Order Item required")
    }

    let orderPrice = 0;
    for (let i = 0; i < objLength; i++) {

        const productId = orderItemObj[i].productId
        const quantity = orderItemObj[i].quantity

        const product = await Product.findById(productId)
        const price = (product.price) * quantity

        orderPrice += price;

    }

    console.log(orderPrice)



    const order = await Ordre.create(
        {
            custumerName: req.user?.fullName,
            custumerId: req.user?._id,
            orderPrice,
            phone,
            orderItem: orderItemObj,
            shippingAddress,
            paymentMethod
        }
    )

    const createdOrder = await Ordre.findById(order?._id)

    if (!createdOrder) {
        throw new ApiError(500, "Something went wrong while taking order")
    }

    return res
        .status(201)
        .json(new ApiResponse(201, createdOrder, "Order created sucessfully"))

})



export {

    orderItems
}