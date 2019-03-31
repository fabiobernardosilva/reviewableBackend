import { getConnection } from "typeorm";
import { Review } from "../entities/review";

export function getReviewRepository(){
    const connection = getConnection();
    const reviewRepository = connection.getRepository(Review);
    return reviewRepository;
}

