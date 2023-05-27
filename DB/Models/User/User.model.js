import mongoose from 'mongoose';
import bcrypt from "bcrypt"


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        required: [true, "User Name Is Required"],
        minLength: [1, "too short category name"]
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: [true, "User Name Is Required"],
        minLength: [5, "too short category name"]
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "MinLength 6 characters"]
    },
    Phone: {
        type: Number,
        required: [true, "Phone is Required"]
    },
    changePassword: Date,
    ProfilePic: String,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    whishlist:
        [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Product"
        }],
    
    isActive: {
        type: Boolean,
        default: false
    },
    Verfied: {
        type: Boolean,
        default: false
    },
    address: [{
        city: String,
        street: String,
        phone: String
    }]
}, {
    timestamps: true
})

UserSchema.pre('save', function () {
    this.password = bcrypt.hashSync(this.password, 7)
})

UserSchema.pre('findOneAndUpdate', function () {
    if (this._update.password) {
        this._update.password = bcrypt.hashSync(this._update.password, 7)
    }
})


export const UserModel = mongoose.model("User", UserSchema)