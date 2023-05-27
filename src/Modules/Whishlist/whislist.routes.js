import { Router } from "express";
import * as Whishlist from "./wishlist.controller.js";
import { protectRoute } from "../auth/auth.controller.js";


const WhishlistRoutes = Router()


WhishlistRoutes.patch("/",protectRoute,Whishlist.addToWhishlist)
WhishlistRoutes.delete("/",protectRoute,Whishlist.RemoveFromWhishlist)
WhishlistRoutes.get("/",protectRoute,Whishlist.GetAllWhishlist)




export default WhishlistRoutes;