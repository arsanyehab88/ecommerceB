import { Router } from "express";
import * as Coupon from "./Coupon.controller.js";


const CouponRoutes = Router()


CouponRoutes.route("/")
    .post(Coupon.CreateCoupon)
    .get(Coupon.GetAllCoupon)

CouponRoutes.route("/:_id")
    .get(Coupon.GetCouponById)
    .delete(Coupon.DeleteCoupon)
    .put(Coupon.UpdateCoupon)




export default CouponRoutes;