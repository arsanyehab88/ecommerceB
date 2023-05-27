import slugify from "slugify"
import CathchAsyncErorr from "../../Utils/MiddleWare/CathchAsyncErorr/CathchAsyncErorr.js"
import { AppError } from "../../Utils/Services/AppError.js"
import DeleteOne from "../../Utils/Handlers/refactors.handler.js"
import { ProductModel } from "../../../DB/Models/Product/Product.Model.js"
import ApiFeatures from "../../Utils/ApiFeatures.js"





export const CreateProduct = CathchAsyncErorr(
    async (req, res) => {
        req.body.slug = slugify(req.body.title)
        req.body.imageCover=req.files.imageCover[0].filename
        req.body.images=req.files.images.map(ele => ele.filename)
        let result = await ProductModel(req.body)
        let added = await result.save()
        res.status(201).json({ message: "Done", added })
    }
)


export const GetAllProduct = CathchAsyncErorr(async (req, res) => {
    let apifeature = new ApiFeatures(ProductModel.find(), req.query).pagination().sort().fields().search()
    let result = await apifeature.mongosseQuery
    res.json({ message: "Done", Page: apifeature.page, limit: apifeature.limit, result })
})

export const GetProductById = CathchAsyncErorr(async (req, res) => {
    const { _id } = req.params
    let result = await ProductModel.findById(_id)
    !result && next(new AppError("Not Found Product", 404))
    result && res.json({ message: "Done", result })
})

export const UpdateProduct = CathchAsyncErorr(async (req, res) => {
    const { _id, title } = req.body
    if (title) {
        req.body.slug = slugify(title)
    }
    let update = await ProductModel.findByIdAndUpdate(_id, { ...req.body }, { new: true })
    !update && next(new AppError("Not Found Product", 404))
    update && res.json({ message: "Done", update })
})

export const DeleteProduct = DeleteOne(ProductModel,"Product")
