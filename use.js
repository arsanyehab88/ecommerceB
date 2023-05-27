import BrandRoutes from "./src/Modules/Brand/Brand.Routes.js"
import CartRoutes from "./src/Modules/Cart/Cart.Routes.js"
import CategoryRoutes from "./src/Modules/Category/Category.Routes.js"
import CouponRoutes from "./src/Modules/Coupon/Coupon.Routes.js"
import OrderRoutes from "./src/Modules/Order/Order.Routes.js"
import ProductRoutes from "./src/Modules/Product/Product.Routes.js"
import ReviewRoutes from "./src/Modules/Review/Review.Routes.js"
import SubCategoryRoutes from "./src/Modules/SubCategory/SubCategory.Routes.js"
import userRoutes from "./src/Modules/User/User.Routes.js"
import WhishlistRoutes from "./src/Modules/Whishlist/whislist.routes.js"
import AddressRoutes from "./src/Modules/address/address.routes.js"
import GlobalErrorHandling from "./src/Utils/MiddleWare/GlobalErorrHandling/GlobalErorrHandling.js"
import { AppError } from "./src/Utils/Services/AppError.js"



export function init(app) {
    app.use("/Category", CategoryRoutes)
    app.use("/SubCategory", SubCategoryRoutes)
    app.use("/Brand", BrandRoutes)
    app.use("/product", ProductRoutes)
    app.use("/User", userRoutes)
    app.use("/Review", ReviewRoutes)
    app.use("/Whishlist",WhishlistRoutes)
    app.use("/adress",AddressRoutes)
    app.use("/Coupon",CouponRoutes)
    app.use("/cart",CartRoutes)
    app.use("/order",OrderRoutes)
    
    app.all("*", (req, res, next) => {
        next(new AppError(`cant find this route ${req.originalUrl}`, 404))
    })
    app.use(GlobalErrorHandling)
}