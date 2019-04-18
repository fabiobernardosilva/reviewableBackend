import { getConnection } from "typeorm";
import { School } from "../entities/school";

/** 
 * This function gets the created connection with the database,
 * then retrieves and returns repository for the School entity
 */
export function getSchoolRepository() {
    const connection = getConnection();
    const schoolRepository = connection.getRepository(School);
    return schoolRepository;
}

