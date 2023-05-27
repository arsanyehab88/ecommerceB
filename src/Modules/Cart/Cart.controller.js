import CathchAsyncErorr from "../../Utils/MiddleWare/CathchAsyncErorr/CathchAsyncErorr.js"
import DeleteOne from "../../Utils/Handlers/refactors.handler.js"
import ApiFeatures from "../../Utils/ApiFeatures.js"
import { AppError } from "../../Utils/Services/AppError.js"
import { CartModel } from "../../../DB/Models/Cart/Cart.model.js"
import { ProductModel } from "../../../DB/Models/Product/Product.Model.js"


function calcPrice(carts) {
    let totalPrice = 0
    carts.cartItems.forEach((ele) => {
        totalPrice += ele.price * ele.quantity
    })
    carts.totalPrice = totalPrice
}


export const CreateCart = CathchAsyncErorr(
    async (req, res, next) => {
        let result = await ProductModel.findById(req.body.product).select('price')
        !result && next(new AppError("Product not found", 404))
        req.body.price = result.price
        let exist = await CartModel.findOne({ user: req.user._id })
        if (!exist) {
            let cart = await CartModel({
                user: req.user._id,
                cartItems: [req.body]
            })
            calcPrice(cart)
            await cart.save()
            return res.json({ message: "Done", cart })
        }
        let item = exist.cartItems.find((ele) => ele.product == req.body.product)
        if (item) {
            item.quantity += 1
        } else {
            exist.cartItems.push(req.body)
        }

        calcPrice(exist)
        await exist.save()
        res.json({ message: "Done", exist })
    }
)



export const GetCart = CathchAsyncErorr(async (req, res) => {
    let cart = await CartModel.findOne({ user: req.user._id })
    !cart && next(new AppError("Cart is Empty", 200))
    res.json({ message: "Done", cart })
})


export const DeleteItem = CathchAsyncErorr(async (req, res) => {
    let item = await CartModel.findOneAndUpdate({ user: req.user._id }, { $pull: { cartItems: { _id: req.params.id } } }, { new: true })
    res.json({ message: "Done", item })
})


export const UpdateCart = CathchAsyncErorr(
    async (req, res, next) => {
        let result = await ProductModel.findById(req.body.product).select('price')
        !result && next(new AppError("Product not found", 404))
        req.body.price = result.price
        let exist = await CartModel.findOne({ user: req.user._id })
        let item = exist.cartItems.find((ele) => ele.product == req.body.product)
        !item && next(new AppError("item not found", 404))
        if (item) {
            item.quantity = req.body.quantity
        }

        calcPrice(exist)
        await exist.save()
        res.json({ message: "Done", exist })
    }
)
