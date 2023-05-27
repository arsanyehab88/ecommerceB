import slugify from "slugify"
import CathchAsyncErorr from "../../Utils/MiddleWare/CathchAsyncErorr/CathchAsyncErorr.js"
import { SubCategoryModel } from "../../../DB/Models/SubCategory/SubCategory.model.js"
import DeleteOne from "../../Utils/Handlers/refactors.handler.js"
import ApiFeatures from "../../Utils/ApiFeatures.js"
import { AppError } from "../../Utils/Services/AppError.js"





export const CreateSubCategory = CathchAsyncErorr(
    async (req, res) => {
        const { name, categoryId } = req.body
        let result = await SubCategoryModel.insertMany({ name, slug: slugify(name), category: categoryId })
        res.json({ message: "Done", result })
    }
)


export const GetAllSubCategorys = CathchAsyncErorr(async (req, res) => {
    let filters = {}
    if (req.params && req.params._id) {
        filters = {
            category: req.params._id
        }
    }
    let apifeature = new ApiFeatures(SubCategoryModel.find(filters), req.query).pagination().sort().fields().search()
    let result = await apifeature.mongosseQuery

    res.json({ message: "Done", Page: apifeature.page, limit: apifeature.limit, result })
})

export const GetSubCategoryById = CathchAsyncErorr(async (req, res,next) => {
    const { _id } = req.params
    let result = await SubCategoryModel.findById(_id)
    !result && next(new AppError("Not Found SubCategory", 404))
    result && res.json({ message: "Done", result })
})

export const UpdateSubCategory = CathchAsyncErorr(async (req, res,next) => {
    const { _id, name, categoryId } = req.body
    let update = await SubCategoryModel.findByIdAndUpdate(_id, { name, slug: slugify(name), category: categoryId }, { new: true })
    !update && next(new AppError("Not Found SubCategory", 404))
    update && res.json({ message: "Done", update })
})

export const DeleteSubCategory = DeleteOne(SubCategoryModel,"SubCategory")