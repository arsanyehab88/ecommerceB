import mongoose from 'mongoose';



const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: [true, "Name Is Required"],
        trim: true,
        required: true,
        minLength: [2, "too short Product name"]
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        min: 0
    },
    priceAfterDiscount: {
        type: Number,
        min: 0
    },
    RatingAvrg: {
        type: Number,
        min: [1, "Raiting average must be greater than 1"],
        max: [5, "Raiting average must be less than 5"]
    },
    RatingCount: {
        type: Number,
        default: 0,
        min: 0,
    },
    Description: {
        type: String,
        min: [5, "too short product description"],
        max: [300, "too long product description"],
        required: [true, "product description required"],
        trim: true
    },
    Quantity: {
        type: Number,
        default: 0,
        min: 0
    },
    sold: {
        type: Number,
        default: 0,
        min: 0
    },
    imageCover: String,
    images: [String],
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: [true, "product category is required"]
    },
    Subcategory: {
        type: mongoose.Types.ObjectId,
        ref: "SubCategory",
        required: [true, "product Subcategory is required"]
    },
    Brand: {
        type: mongoose.Types.ObjectId,
        ref: "Brand",
        required: [true, "product Brand is required"]
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject:{virtuals: true}
})

ProductSchema.post('init', (doc) => {

    doc.imageCover = process.env.BaseURL + 'product/' + doc.imageCover;
    if(doc.images) doc.images = doc.images.map(ele => process.env.BaseURL + 'product/' + ele);


})
ProductSchema.virtual('MyReview', {
    ref: "review",
    localField: '_id',
    foreignField: 'product'
});

ProductSchema.pre(/^find/,function(){
    this.populate("MyReview")
})


export const ProductModel = mongoose.model("Product", ProductSchema)