import { Router } from "express";
import * as users from "./User.controller.js";
import authRoutes from "../auth/auth.routes.js";



const userRoutes = Router()



userRoutes.route("/")
    .post(users.CreateUser)
    .get(users.GetAllUsers)
    .put(users.UpdateUser)
    .patch(users.ChangePassword);

userRoutes.route("/:_id")
    .get(users.GetUserById)
    .delete(users.DeleteUser);

userRoutes.use(authRoutes)

export default userRoutes;