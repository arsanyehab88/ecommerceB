import joi from "joi"


export const CategorySchema = joi.object({
    name: joi.string().min(3).max(30).required()
})

export const updateCategorySchema = joi.object({
    name: joi.string().min(3).max(30).required(),
    _id: joi.string().hex().length(24).required()
})


export const BrandSchema = joi.object({
    name: joi.string().min(2).max(30).required()
})
export const updateBrandSchema = joi.object({
    name: joi.string().min(2).max(30).required(),
    _id: joi.string().hex().length(24).required()
})


export const IDSchema = joi.object({
    _id: joi.string().hex().length(24).required()
})





export const ProductSChema = joi.object({

    title: joi.string().min(3).max(30).required(),
    price: joi.number().min(0).required(),
    priceAfterDiscount: joi.number().min(0).required(),
    RatingAvrg: joi.number().min(1).max(5),
    RatingCount: joi.number().min(0),
    Description: joi.string().min(10).max(300).required(),
    Quantity: joi.number().min(0).required(),
    sold: joi.number().min(0),
    category: joi.string().hex().length(24).required(),
    Subcategory: joi.string().hex().length(24).required(),
    Brand: joi.string().hex().length(24).required()

})