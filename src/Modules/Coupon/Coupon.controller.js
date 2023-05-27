import CathchAsyncErorr from "../../Utils/MiddleWare/CathchAsyncErorr/CathchAsyncErorr.js"
import DeleteOne from "../../Utils/Handlers/refactors.handler.js"
import ApiFeatures from "../../Utils/ApiFeatures.js"
import { AppError } from "../../Utils/Services/AppError.js"
import { CouponModel } from "../../../DB/Models/Coupon/Coupon.model.js"
import QRCode from 'qrcode'





export const CreateCoupon = CathchAsyncErorr(
    async (req, res,next) => {
        let result = await CouponModel.insertMany(req.body)
        res.json({ message: "Done", result })
    }
)


export const GetAllCoupon = CathchAsyncErorr(async (req, res) => {
    let apifeature = new ApiFeatures(CouponModel.find(), req.query).pagination().sort().fields().search()
    let result = await apifeature.mongosseQuery
    res.json({ message: "Done", Page: apifeature.page, limit: apifeature.limit, result })
})

export const GetCouponById = CathchAsyncErorr(async (req, res,next) => {
    const { _id } = req.params
    let result = await CouponModel.findById(_id)
    !result && next(new AppError("Not Found Coupon", 404))
    let url = await QRCode.toDataURL(result.code)
    result && res.json({ message: "Done", result,url })
})

export const UpdateCoupon = CathchAsyncErorr(async (req, res,next) => {
    const { _id} = req.params
    let update = await CouponModel.findOneAndUpdate({_id},req.body, { new: true })
    !update && next(new AppError("Not Found Coupon", 404))
    update && res.json({ message: "Done", update })
})

export const DeleteCoupon = DeleteOne(CouponModel, "Coupon")