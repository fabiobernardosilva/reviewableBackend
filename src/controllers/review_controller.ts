import express from "express"
import { getReviewRepository } from "../repositories/review_repository";
import { getSchoolRepository } from "../repositories/school_repository"
import { Review } from "../entities/review";

/**
 *  This function gets the Review repository and creates an Express Router.
 * This router then, uses HTTP methods, such as GET and POST to retrieve or save reviews.
 * Each internal operation makes use of HTTP requests and responses to perform those actions,
 * with responses being formatted as JSON. Finally, this function then, returns the router.
 */
export function getReviewController() {
    const reviewRepository = getReviewRepository();
    const router = express.Router();

    // Returns all reviews
    router.get("/", (req, res) => {
        (async () => {
            const reviews = await reviewRepository.find();
            res.json(reviews);
        })();
    });

    // Creates a new review
    router.post("/", (req, res) => {
        (async () => {
            const bodyReview = req.body;
            if (bodyReview) {
                const schoolId = req.body.schoolSchoolId;
                const school = await getSchoolRepository().findOne(schoolId);
                if (!school) {
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
                newReview.verificationStatus = req.body.verificationStatus;
                newReview.postStatus = req.body.postStatus;

                const review = await reviewRepository.save(newReview);
                res.json(review);

            } else {
                res.status(400).send("ERROR CREATING NEW REVIEW");
            }
        })();
    });

    // Deletes a review
    router.post("/:reviewId", (req, res) => {
        (async () => {
            const reviewIdString = req.params.reviewId as string;
            reviewRepository.delete(reviewIdString);
            res.json(true);
        })();
    });

    return router;
}