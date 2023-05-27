import { Router } from "express";
import * as Brands from "./Brand.controller.js";
import { FileUpload } from "../../Utils/UploadPhoto/FileUpload.js";
import { Validition } from "../../Utils/MiddleWare/Valdition/valdition.js";
import { BrandSchema, IDSchema, updateBrandSchema } from "../../Utils/Valdition/Valdition.Schema.js";


const BrandRoutes = Router()



BrandRoutes.route("/")
    .post(FileUpload("brand","logo"),Validition(BrandSchema), Brands.CreateBrand)
    .get(Brands.GetAllBrands)
    .put(Validition(updateBrandSchema),Brands.UpdateBrand);

BrandRoutes.route("/:_id")
    .get(Validition(IDSchema),Brands.GetBrandById)
    .delete(Validition(IDSchema),Brands.DeleteBrand);



export default BrandRoutes;