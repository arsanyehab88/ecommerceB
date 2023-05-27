import mongoose from "mongoose";





const OrderSchema = new mongoose.Schema({
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
    totalOrderPrice:Number,
    discount:Number,
    totalOrderPriceAfterDiscount:Number,
    paymentMethod:{
        type:String,
        enums:["cash",'credit'],
        default:"cash"
    },
    address: [{
        city: String,
        street: String,
        phone: String
    }],
    isPaid:Boolean,
    PaidAt:Date,
    isDlivered:Boolean,
    NumberOn:String
},{
    timestamps:true
})


export const OrderModel = mongoose.model("order",OrderSchema)