import CathchAsyncErorr from "../../Utils/MiddleWare/CathchAsyncErorr/CathchAsyncErorr.js"
import DeleteOne from "../../Utils/Handlers/refactors.handler.js"
import ApiFeatures from "../../Utils/ApiFeatures.js"
import { AppError } from "../../Utils/Services/AppError.js"
import { UserModel } from "../../../DB/Models/User/User.model.js"




export const addToWhishlist =CathchAsyncErorr( async (req,res,next)=>{
   let {product}=req.body

    let results = await UserModel.findByIdAndUpdate(req.user._id,{ $addToSet:{whishlist:product}},{new:true})
    !results && next(new AppError("invalid whishlist",404))
    res.json({message:"Done",results})
})

export const RemoveFromWhishlist = CathchAsyncErorr(async (req,res,next)=>{
    let {product}=req.body
    let results = await UserModel.findByIdAndUpdate(req.user._id,{ $pull:{whishlist:product}},{new:true})
    !results && next(new AppError("invalid whishlist",404))
    res.json({message:"Done",results})
})

export const GetAllWhishlist = CathchAsyncErorr(async (req,res,next)=>{
    let results = await UserModel.findById(req.user._id)
    !results && next(new AppError("invalid whishlist",404))
    res.json({message:"Done",results: results.whishlist})
})