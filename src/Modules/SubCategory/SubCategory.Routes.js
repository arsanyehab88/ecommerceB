import { Router } from "express";
import * as SubCategorys from "./SubCategory.controller.js";


const SubCategoryRoutes = Router({mergeParams:true})


SubCategoryRoutes.route("/")
    .post(SubCategorys.CreateSubCategory)
    .get(SubCategorys.GetAllSubCategorys)
    .put(SubCategorys.UpdateSubCategory);

SubCategoryRoutes.route("/:_id")
    .get(SubCategorys.GetSubCategoryById)
    .delete(SubCategorys.DeleteSubCategory);




export default SubCategoryRoutes;