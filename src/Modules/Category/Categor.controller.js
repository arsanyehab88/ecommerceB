import { CategoryModel } from "../../../DB/Models/Category/Category.Model.js"
import slugify from "slugify"
import CathchAsyncErorr from "../../Utils/MiddleWare/CathchAsyncErorr/CathchAsyncErorr.js"
import { AppError } from "../../Utils/Services/AppError.js"
import DeleteOne from "../../Utils/Handlers/refactors.handler.js"
import ApiFeatures from "../../Utils/ApiFeatures.js"





export const CreateCategory = CathchAsyncErorr(
    async (req, res) => {
        const { name } = req.body
        let result = await CategoryModel.insertMany({ name, slug: slugify(name), image: req.file.filename })
        res.json({ message: "Done", result })
    }
)


export const GetAllCategorys = CathchAsyncErorr(async (req, res) => {
    let apifeature = new ApiFeatures(CategoryModel.find(), req.query).pagination().sort().fields().search()
    let result = await apifeature.mongosseQuery
    res.json({ message: "Done", Page: apifeature.page, limit: apifeature.limit, result })
})

export const GetCategoryById = CathchAsyncErorr(async (req, res) => {
    const { _id } = req.params
    let result = await CategoryModel.findById(_id)
    !result && next(new AppError("Not Found Category", 404))
    result && res.json({ message: "Done", result })
})

export const UpdateCategory = CathchAsyncErorr(async (req, res) => {
    const { _id, name } = req.body
    let update = await CategoryModel.findByIdAndUpdate(_id, { name, slug: slugify(name) }, { new: true })
    !update && next(new AppError("Not Found Category", 404))
    update && res.json({ message: "Done", update })
})

export const DeleteCategory = DeleteOne(CategoryModel,"Category")
