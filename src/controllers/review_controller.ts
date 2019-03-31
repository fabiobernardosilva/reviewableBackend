import express from "express"
import { getReviewRepository } from "../repositories/review_repository";
import { getSchoolRepository } from "../repositories/school_repository"
import { Review } from "../entities/review";

export function getReviewController() {
    const reviewRepository = getReviewRepository();

    const router = express.Router();

    // Private
    // GET
    router.get("/", (req, res) => {
        (async () => {
            const reviews = await reviewRepository.find();
            res.json(reviews);
        })();
    });

    // CREATE NEW REVIEW
    router.post("/", (req, res) => {
        (async () => {
            const bodyReview = req.body;
            if (bodyReview) {
                const schoolId = req.body.schoolSchoolId;
                const school = await getSchoolRepository().findOne(schoolId);
                if(!school){
                    return res.status(400).send("ERROR");
                }
                const newReview = new Review();
                newReview.school = school;
                newReview.reviewerName = req.body.reviewerName;
                newReview.recommendation = req.body.recommendation;
                newReview.dOB = req.body.dOB;
                newReview.comment = req.body.comment;
                newReview.email = req.body.email;
                newReview.facilities = req.body.facilities;
                newReview.staff = req.body.staff;
                newReview.teacher = req.body.teacher;

                const review = await reviewRepository.save(newReview);
                res.json(review);
                
            } else {
                res.status(400).send("ERROR CREATING NEW REVIEW");
            }
        })();
    });

    // DELETE REVIEW
    router.post("/:reviewId", (req, res) => {
        (async() => {
            const reviewIdString = req.params.reviewId as string;
            reviewRepository.delete(reviewIdString);
            res.json(true);
        })();
    });
    
    return router;
}