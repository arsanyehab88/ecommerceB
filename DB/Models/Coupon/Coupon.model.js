import mongoose from "mongoose";



const CouponSchema = new mongoose.Schema({
    code : {
        type:String,
        trim:true,
        required:[true,"coupone code is required"],
        unique:true
    },
    discount:{
        type:Number,
        min:0,
        required:[true,"coupone discount is required"]
    },
    expires:{
        type:String,
        required:[true,"expires is required"]
    }
},{
    timestamps:true
})


export const CouponModel= mongoose.model("code",CouponSchema)
