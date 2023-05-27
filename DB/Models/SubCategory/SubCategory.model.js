import mongoose from 'mongoose';



const SubCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, "Name Is Required"],
        trim: true,
        required: true,
        minLength: [2, "too short SubCategory name"]
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    }
}, {
    timestamps: true
})

export const SubCategoryModel = mongoose.model("SubCategory", SubCategorySchema)