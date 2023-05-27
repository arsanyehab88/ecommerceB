import { Router } from "express";
import * as auth from "./auth.controller.js";



const authRoutes = Router()



authRoutes.post("/SignUp",auth.Signup)
authRoutes.post("/SignIn",auth.SignIn)


    



export default authRoutes;