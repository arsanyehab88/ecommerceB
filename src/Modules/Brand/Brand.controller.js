import CathchAsyncErorr from "../../Utils/MiddleWare/CathchAsyncErorr/CathchAsyncErorr.js"
import { BrandModel } from "../../../DB/Models/Brand/Brand.model.js"
import slugify from "slugify"
import DeleteOne from "../../Utils/Handlers/refactors.handler.js"
import ApiFeatures from "../../Utils/ApiFeatures.js"




export const CreateBrand = CathchAsyncErorr(
    async (req, res) => {
        const { name } = req.body
        let result = await BrandModel.insertMany({ name, slug: slugify(name),logo:req.file.filename })
        res.status(201).json({ message: "Done", result })
    }
)


export const GetAllBrands = CathchAsyncErorr(async (req, res) => {
    let apifeature = new ApiFeatures(BrandModel.find(), req.query).pagination().sort().fields().search()
    let result = await apifeature.mongosseQuery
    res.json({ message: "Done", Page: apifeature.page, limit: apifeature.limit, result })
})

export const GetBrandById = CathchAsyncErorr(async (req, res) => {
    const { _id } = req.params
    let result = await BrandModel.findById(_id)
    !result && res.status(404).json({ message: "Not Found Brand" })
    result && res.json({ message: "Done", result })
})

export const UpdateBrand = CathchAsyncErorr(async (req, res) => {
    const { _id, name } = req.body
    let update = await BrandModel.findByIdAndUpdate(_id, { name }, { new: true })
    !update && res.status(404).json({ message: "Not Found Brand" })
    update && res.json({ message: "Done", update })
})

export const DeleteBrand = DeleteOne(BrandModel,"Brand")