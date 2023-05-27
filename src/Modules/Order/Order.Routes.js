import { Router } from "express";
import * as order from "./Order.controller.js";
import { protectRoute } from "../auth/auth.controller.js";


const OrderRoutes = Router()


OrderRoutes.route("/:id")
    .post(protectRoute, order.CreateOrder)

OrderRoutes.route("/")
    .get(protectRoute, order.getOrder);

OrderRoutes.get("/AllOrders", protectRoute, order.GetAllOrder)
OrderRoutes.post("/online/:id", protectRoute, order.onlinePayment)


export default OrderRoutes;