import CathchAsyncErorr from "../../Utils/MiddleWare/CathchAsyncErorr/CathchAsyncErorr.js"
import { AppError } from "../../Utils/Services/AppError.js"
import { UserModel } from "../../../DB/Models/User/User.model.js"




export const addToAddress =CathchAsyncErorr( async (req,res,next)=>{
    const{city,street,phone}=req.body
    let results = await UserModel.findByIdAndUpdate(req.user._id,{ 
        $push:{address:{city,
            street,
            phone}}}
        ,{new:true})
    !results && next(new AppError("invalid Address",404))
    res.json({message:"Done",results})
})

export const RemoveFromAddress = CathchAsyncErorr(async (req,res,next)=>{
    const {city}=req.body
    let results = await UserModel.findByIdAndUpdate(req.user._id,{ $pull:{address:{city}}},{new:true})
    !results && next(new AppError("invalid Address",404))
    res.json({message:"Done",results})
})

export const GetAllAddress = CathchAsyncErorr(async (req,res,next)=>{
    let results = await UserModel.findById(req.user._id)
    !results && next(new AppError("invalid Adress",404))
    res.json({message:"Done",address: results.address})
})