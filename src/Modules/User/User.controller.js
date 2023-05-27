import CathchAsyncErorr from "../../Utils/MiddleWare/CathchAsyncErorr/CathchAsyncErorr.js"
import DeleteOne from "../../Utils/Handlers/refactors.handler.js"
import ApiFeatures from "../../Utils/ApiFeatures.js"
import { UserModel } from "../../../DB/Models/User/User.model.js"
import { AppError } from "../../Utils/Services/AppError.js"




export const CreateUser = CathchAsyncErorr(
    async (req, res, next) => {
        const { email } = req.body
        let exist = await UserModel.findOne({ email })
        if (exist) return next(new AppError("Dublicate Email", 409))
        let add = await UserModel(req.body)
        let result = await add.save()
        res.status(201).json({ message: "Done", result })
    }
)


export const GetAllUsers = CathchAsyncErorr(async (req, res) => {
    let apifeature = new ApiFeatures(UserModel.find(), req.query).pagination().sort().fields().search()
    let result = await apifeature.mongosseQuery
    res.json({ message: "Done", Page: apifeature.page, limit: apifeature.limit, result })
})

export const GetUserById = CathchAsyncErorr(async (req, res) => {
    const { _id } = req.params
    let result = await UserModel.findById(_id)
    !result && res.status(404).json({ message: "Not Found Brand" })
    result && res.json({ message: "Done", result })
})

export const UpdateUser = CathchAsyncErorr(async (req, res) => {
    const { _id, name } = req.body
    let update = await UserModel.findByIdAndUpdate(_id, { name }, { new: true })
    !update && res.status(404).json({ message: "Not Found Brand" })
    update && res.json({ message: "Done", update })
})
export const ChangePassword = CathchAsyncErorr(async (req, res) => {
    const { _id } = req.body
    req.body.changePassword=Date.now()
    
    let update = await UserModel.findOneAndUpdate
    ({_id}, req.body, { new: true })
    !update && res.status(404).json({ message: "Not Found Brand" })
    update && res.json({ message: "Done", update })
})
export const DeleteUser = DeleteOne(UserModel, "Brand")