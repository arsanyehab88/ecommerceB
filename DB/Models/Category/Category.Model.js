import mongoose from 'mongoose';



const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, "Name Is Required"],
        trim: true,
        required: true,
        minLength: [2, "too short category name"]
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    image: String
}, {
    timestamps: true
})
CategorySchema.post('init',(doc)=>{
    doc.image = process.env.BaseURL + 'Category/'+doc.image;
})


export const CategoryModel = mongoose.model("Category",CategorySchema)