import CathchAsyncErorr from "../../Utils/MiddleWare/CathchAsyncErorr/CathchAsyncErorr.js"
import DeleteOne from "../../Utils/Handlers/refactors.handler.js"
import ApiFeatures from "../../Utils/ApiFeatures.js"
import { ReviewModel } from "../../../DB/Models/Review/review.Model.js"
import { AppError } from "../../Utils/Services/AppError.js"





export const CreateReview = CathchAsyncErorr(
    async (req, res,next) => {
        req.body.user = req.user._id
        let review = await ReviewModel.findOne({user:req.user._id , product:req.body.product})
        if(review) return next(new AppError("already have review",409))
        let result = await ReviewModel.insertMany(req.body)
        res.json({ message: "Done", result })
    }
)


export const GetAllReviews = CathchAsyncErorr(async (req, res) => {
    let filters = {}
    if (req.params && req.params._id) {
        filters = {
            category: req.params._id
        }
    }
    let apifeature = new ApiFeatures(ReviewModel.find(filters), req.query).pagination().sort().fields().search()
    let result = await apifeature.mongosseQuery
    res.json({ message: "Done", Page: apifeature.page, limit: apifeature.limit, result })
})

export const GetReviewById = CathchAsyncErorr(async (req, res,next) => {
    const { _id } = req.params
    let result = await ReviewModel.findById(_id)
    !result && next(new AppError("Not Found Review", 404))
    result && res.json({ message: "Done", result })
})

export const UpdateReview = CathchAsyncErorr(async (req, res,next) => {
    const { _id, comment, rating, product } = req.body
    let update = await ReviewModel.findOneAndUpdate({_id,user:req.user._id }, { comment, rating, product }, { new: true })
    !update && next(new AppError("Not Found Review", 404))
    update && res.json({ message: "Done", update })
})

export const DeleteReview = DeleteOne(ReviewModel, "Review")