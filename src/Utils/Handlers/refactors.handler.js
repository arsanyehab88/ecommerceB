import CathchAsyncErorr from "../MiddleWare/CathchAsyncErorr/CathchAsyncErorr.js"
import { AppError } from "../Services/AppError.js"

const DeleteOne = (model,x) => {
    return CathchAsyncErorr(async (req, res, next) => {
        const { _id } = req.params
        let result = await model.findByIdAndDelete(_id)
        !result && next(new AppError(`Not Found ${x}`, 404))
        result && res.json({ message: "Done", result })

    })
}

export default DeleteOne;