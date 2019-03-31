import { getConnection } from "typeorm";
import { School } from "../entities/school";

export function getSchoolRepository(){
    const connection = getConnection();
    const schoolRepository = connection.getRepository(School);
    return schoolRepository;
}

