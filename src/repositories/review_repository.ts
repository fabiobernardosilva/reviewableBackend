import { getConnection } from "typeorm";
import { Review } from "../entities/review";

/** 
 * This function gets the created connection with the database,
 * then retrieves and returns repository for the Review entity
 */
export function getReviewRepository() {
    const connection = getConnection();
    const reviewRepository = connection.getRepository(Review);
    return reviewRepository;
}

