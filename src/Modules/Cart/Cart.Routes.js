import { Router } from "express";
import * as cart from "./Cart.controller.js";
import { protectRoute } from "../auth/auth.controller.js";


const CartRoutes = Router()


CartRoutes.route("/")
    .post(protectRoute, cart.CreateCart)
    .get(protectRoute, cart.GetCart)
    .put(protectRoute,cart.UpdateCart)

 CartRoutes.route("/:id")
    .delete(protectRoute,cart.DeleteItem);
 



export default CartRoutes;