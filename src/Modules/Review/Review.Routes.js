import { Router } from "express";
import * as Reviews from "./Review.controller.js";
import { protectRoute } from "../auth/auth.controller.js";


const ReviewRoutes = Router()


ReviewRoutes.route("/")
    .post(protectRoute,Reviews.CreateReview)
    .get(Reviews.GetAllReviews)
    .put(protectRoute,Reviews.UpdateReview);

ReviewRoutes.route("/:_id")
    .get(Reviews.GetReviewById)
    .delete(Reviews.DeleteReview);




export default ReviewRoutes;