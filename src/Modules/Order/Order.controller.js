import CathchAsyncErorr from "../../Utils/MiddleWare/CathchAsyncErorr/CathchAsyncErorr.js"
import Stripe from 'stripe';
import { AppError } from "../../Utils/Services/AppError.js"
import { ProductModel } from "../../../DB/Models/Product/Product.Model.js"
import { OrderModel } from "../../../DB/Models/Order/Order.model.js"
import { CartModel } from "../../../DB/Models/Cart/Cart.model.js"
import { UserModel } from "../../../DB/Models/User/User.model.js"
import { nanoid } from "nanoid"


const stripe = new Stripe('sk_test_51NC7noBKdXritUW1jPDWD3iDabMbWjVHg9oCKuzJ3D3AMjJbv7NqpY3BKEeC6xqtNkceX1yCJujjJDcfPWK1Yr1500iR6yuofp');



export const CreateOrder = CathchAsyncErorr(async (req, res, next) => {
    //1 - cart
    let cart = await CartModel.findById(req.params.id)
    //2- Address
    let address = await UserModel.findById(req.user._id).select('address')
    //total price
    !cart && next(new AppError("order already checked out", 404))
    let totalOrderPrice = cart?.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice

    //Create Order
    let order = new OrderModel({
        user: req.user._id,
        cartItems: cart.cartItems,
        totalOrderPrice,
        address,

    })

    //update sold,quantity
    if (order) {
        let options = cart.cartItems.map(ele => ({
            updateOne: {
                filter: { _id: ele.product },
                update: { $inc: { quantity: -ele.quantity, sold: ele.quantity } }
            }
        }))
        await ProductModel.bulkWrite(options)
        order.NumberOn = nanoid(7)
        await order.save()
    } else {
        return next(new AppError("Error", 409))
    }

    await CartModel.findByIdAndDelete(req.params.id)
    res.json({ message: "Done", order })

})


export const getOrder = CathchAsyncErorr(async (req, res, next) => {
    let order = await OrderModel.findOne({ user: req.user._id }).populate("cartItems.product")
    res.json({ message: "Done", order })
})

export const GetAllOrder = CathchAsyncErorr(async (req, res, next) => {
    let order = await OrderModel.find({ user: req.user._id }).populate("cartItems.product")
    res.json({ message: "Done", order })
})


export const onlinePayment = CathchAsyncErorr(async (req, res, next) => {
    let cart = await CartModel.findById(req.params.id)
    //2- Address
    let address = await UserModel.findById(req.user._id).select('address')
    let totalOrderPrice = cart?.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice


    let session = await stripe.checkout.sessions.create({
        line_items: [
            {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price_data: {
                    currency: "EGP",
                    unit_amount: totalOrderPrice * 100,
                    product_data: {
                        name: req.user.name
                    }
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        client_reference_id: req.params.id,
        success_url: "https://route-comm.netlify.app/#/",
        cancel_url: "https://route-comm.netlify.app/#/",
        customer_email: req.user.email

    })

    res.json({ message: "Done", session })
})