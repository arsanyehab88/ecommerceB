import mongoose from 'mongoose';



const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, "Name Is Required"],
        trim: true,
        required: true,
        minLength: [2, "too short Brand name"]
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    logo: String
}, {
    timestamps: true
})

BrandSchema.post('init',(doc)=>{
    doc.logo = process.env.BaseURL + 'Brand/'+doc.logo;
})

export const BrandModel = mongoose.model("Brand", BrandSchema)