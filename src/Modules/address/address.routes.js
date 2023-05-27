import { Router } from "express";
import * as address from "./address.controller.js";
import { protectRoute } from "../auth/auth.controller.js";


const AddressRoutes = Router()


AddressRoutes.patch("/",protectRoute,address.addToAddress)
AddressRoutes.delete("/",protectRoute,address.RemoveFromAddress)
AddressRoutes.get("/",protectRoute,address.GetAllAddress)




export default AddressRoutes;