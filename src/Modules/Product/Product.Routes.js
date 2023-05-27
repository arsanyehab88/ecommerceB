import { Router } from "express";
import * as Product from "./Product.controller.js";
import { Validition } from "../../Utils/MiddleWare/Valdition/valdition.js";
import { ProductSChema } from "../../Utils/Valdition/Valdition.Schema.js";
import { UploadMixFile } from "../../Utils/UploadPhoto/FileUpload.js";
import { allowTo, protectRoute } from "../auth/auth.controller.js";


const ProductRoutes = Router()


ProductRoutes.route("/")
    .post(protectRoute,
        allowTo("user"),
        UploadMixFile("product", [{ name: 'imageCover', maxCount: 1 }, { name: 'images', maxCount: 8 }]), Validition(ProductSChema), Product.CreateProduct)
    .get(Product.GetAllProduct)
    .put(Product.UpdateProduct);

ProductRoutes.route("/:_id")
    .get(Product.GetProductById)
    .delete(Product.DeleteProduct);




export default ProductRoutes;