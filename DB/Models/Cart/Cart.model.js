import mongoose from "mongoose";




const CartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    cartItems:[{
        product:{
            type:mongoose.Types.ObjectId,
            ref:"Product"
        },
        quantity:{
            type:Number,
            default:1
        },
        price:Number
    }],
    totalPrice:Number,
    discount:Number,
    totalPriceAfterDiscount:Number
},{
    timestamps:true
})



export const CartModel = mongoose.model("cart",CartSchema)