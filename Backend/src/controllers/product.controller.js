import { Product } from "../models/product.models.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { Catetory } from "../models/category.models.js"

const addNewProduct = asyncHandler(async (req, res) => {

    // get product details from frontEnd
    // validate required field 
    // check if product already exist in sellers shop: name
    // create database entry
    // check for product creatton
    // send response


    const { name, description, brand, price, category } = req.body

    const emailRegex = /^seller\.([a-zA-Z]+[a-zA-Z0-9]*)@samsara\.com$/;
    const isValidEmail = emailRegex.test(req.user?.email);

    if(!isValidEmail){
        throw new ApiError(401, "Invalid user credentials Seller can only add product")
    }

    if (
        [name, description, brand, price].some((field) => field?.trim() === "" || field?.trim() == undefined)
    ) {
        throw new ApiError(400, "All field are required")
    }

    const objCategory = JSON.parse(category);

    if (
        [objCategory.name, objCategory.color, objCategory.size].some((field) => field?.trim() === "" || field?.trim() == undefined)
    ) {
        throw new ApiError(400, "All category filed are required")
    }

    let dbCategory = await Catetory.findOne(
        {
            name: objCategory.name,
            color: objCategory.color,
            size: objCategory.size
        }
    )

    if (!dbCategory) {
        dbCategory = await Catetory.create(
            {
                name: objCategory.name.trim(),
                color: objCategory.color.trim(),
                size: objCategory.size.trim()
            }
        )
    }

    const createdCategory = await Catetory.findById(dbCategory._id)

    if (!createdCategory) {
        throw new ApiError(500, "something went wrong while creating category")
    }

    const productImageLocalPath = req.files?.productImage[0].path;

    if (!productImageLocalPath) {
        throw new ApiError(400, "product image is requred")
    }

    const productImage = await uploadOnCloudinary(productImageLocalPath);

    const supportImage = req.files['supportImage']

    let supportImageAll = [];

    for (const image of supportImage) {

        const supportImage = await uploadOnCloudinary(image.path)
        supportImageAll.push(supportImage.url)

    }

    const product = await Product.create(
        {
            name,
            description,
            brand,
            productImage: productImage.url,
            supportImage: supportImageAll,
            price,
            category: createdCategory._id,
            owner: req.user?._id

        }
    )

    const createdProduct = await Product.findById(product._id)

    if (!createdProduct) {
        throw new ApiError(500, "something went wrong while adding product")
    }

    return res.status(200).json(new ApiResponse(200, createdProduct, "createed"))

})

const updateProduct = asyncHandler(async (req, res) => {

    const { } = req.body

})


export { addNewProduct, updateProduct }