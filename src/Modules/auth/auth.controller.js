import { UserModel } from "../../../DB/Models/User/User.model.js"
import CathchAsyncErorr from "../../Utils/MiddleWare/CathchAsyncErorr/CathchAsyncErorr.js"
import { AppError } from "../../Utils/Services/AppError.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"



export const Signup = CathchAsyncErorr(async (req, res, next) => {
    let found = await UserModel.findOne({ email: req.body.email })
    if (found) return next(AppError("Email Already Exists", 409))
    let user = await UserModel(req.body)
    let add = await user.save()
    res.json({ message: "Done", add })
})


export const SignIn = CathchAsyncErorr(async (req, res, next) => {
    const { email, password } = req.body
    let found = await UserModel.findOne({ email })
    if (!found) return next(new AppError("Email Dont Register", 409))
    const match = bcrypt.compareSync(password, found.password)
    if (found && match) {
        let token = jwt.sign({ name: found.name, userId: found._id, role: found.role }, process.env.KEY)
        res.json({ message: "Done", token })
    }
    next(new AppError("Email Not Found", 404))
})


export const protectRoute = CathchAsyncErorr(async (req, res, next) => {
    let { token } = req.headers;
    if (!token) return next(new AppError('please provide a token', 401))

    let deccoded = jwt.verify(token, process.env.KEY)
    let user = await UserModel.findById(deccoded.userId)

    if (!user) return next(new AppError("invalid user", 404))
    if (user.changePassword) {
        let changeTime = parseInt(user.changePassword.getTime() / 1000)
        if (changeTime > deccoded.iat) return next(new AppError("Token is invalid", 404))
    }
    req.user = user
    next()
})


export const allowTo = (...roles) => {
    return CathchAsyncErorr( (req, res, next) => {
        if (!roles.includes(req.user.role)) return next(new AppError("Not Authorized", 403))        
        next()
    })
    
}