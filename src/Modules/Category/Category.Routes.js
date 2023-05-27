import { Router } from "express";
import * as Categorys from "./Categor.controller.js";
import SubCategoryRoutes from "../SubCategory/SubCategory.Routes.js";
import { FileUpload } from "../../Utils/UploadPhoto/FileUpload.js";
import {  Validition } from "../../Utils/MiddleWare/Valdition/valdition.js";
import { CategorySchema, IDSchema, updateCategorySchema } from "../../Utils/Valdition/Valdition.Schema.js";


const CategoryRoutes = Router()


CategoryRoutes.use("/:_id/SubCategory", SubCategoryRoutes)

CategoryRoutes.route("/")
    .post( FileUpload("category","image"),Validition(CategorySchema), Categorys.CreateCategory)
    .get(Categorys.GetAllCategorys)
    .put(Validition(updateCategorySchema), Categorys.UpdateCategory);

CategoryRoutes.route("/:_id")
    .get(Validition(IDSchema), Categorys.GetCategoryById)
    .delete(Validition(IDSchema), Categorys.DeleteCategory);



export default CategoryRoutes;