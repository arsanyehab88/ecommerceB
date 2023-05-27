import mongoose from "mongoose";



const ReviewSchema = new mongoose.Schema({
    comment: {
        type: String,
        trim: true,
        required: [true,'Review comment required']
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref:"Product"
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    rating:{
        type:Number,
        min:1,
        max:5
    }
}, {
    timestamps: true
})

ReviewSchema.pre(/^find/,function(){
    this.populate('user','name')
})

export const ReviewModel = mongoose.model("review", ReviewSchema)