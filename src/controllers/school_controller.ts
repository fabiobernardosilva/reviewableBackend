import express from "express"
import { getSchoolRepository } from "../repositories/school_repository";
import { Repository } from "typeorm";
import { School } from "../entities/school";
//import * as joi from "joi";


export function getSchoolController() {
    const schoolRepository = getSchoolRepository();

    const router = express.Router();

    // RETURN ALL SCHOOLS
    router.get("/", (req, res) => {
        (async () => {
          const schools = await schoolRepository.find();
          res.json(schools);
        })();
    });  

    // RETURN SCHOOL BY ID
    router.get("/:schoolId", (req, res) => {
        
        (async () => {
            const schoolIdString = req.params.schoolId as string;
            const schoolIdNumber = parseInt(schoolIdString);
            if (isNaN(schoolIdNumber)) {
                res.status(400).send("School ID must be a number!")
            } else {
                const school = await schoolRepository.findOne(schoolIdNumber, {relations: ["reviews"]});
                res.json(school);
            }
        })();

    });

    // THIS WON'T BE AVAILABLE
    router.post("/", (req, res) => {
        (async () => {
            const newSchool = req.body;
            if (newSchool) {
                const school = await schoolRepository.save(newSchool);
                res.json(school);
            } else {
                res.status(400).send("ERROR CREATING NEW SCHOOL!");
            }
        })();
    });

    router.put("/:schoolId", (req, res) => {
        (async () => {
            const schoolId = req.params.schoolId;
            const update = req.body;
            const oldSchool = await schoolRepository.findOne(schoolId);
            if (oldSchool) {
                oldSchool.schoolName = update.schoolName;
                oldSchool.website = update.website;
                const updatedSchool = await schoolRepository.save(oldSchool);
                res.json(updatedSchool);
            } else {
                res.status(404).send("ERROR WITH FULL UPDATE OF SCHOOL")
            }
        })();
    });

    // DELETE
    router.delete("/:schoolId", (req, res) => {
        (async () => {
            const schoolIdString = req.params.schoolId as string;
            schoolRepository.delete(schoolIdString);
            res.json(true);
        })();
    });

    // PATCH
    router.patch("/:schoolId", (req, res) => {
        (async () => {
            const schoolId = req.params.schoolId;
            const update = req.body;
            const oldSchool = await schoolRepository.findOne(schoolId);
            if (oldSchool) {
                const key = Object.keys(update)[0];
                const value = update.key;
                (oldSchool as any)[key] = value;
                const updatedSchool = await schoolRepository.save(oldSchool);
                res.json(updatedSchool);
            } else {
                res.status(404).send("ERROR WHEN USING PATCH TO UPDATE SCHOOL");
            }
        })();
    });

    return router;
}

/*
export function getHandlers(schoolRepository: Repository<School>){
    
    const getAllSchools = (req: express.Request, res: express.Response) => {
        (async() => {
            try {
                const schools = await schoolRepository.find();
                res.json(schools).send();

            } catch(err) {
                console.error(err);
                res.status(500).json({error: "Internal server error"}).send();
            }
        })();
    };

    const getSchoolById = (req: express.Request, res: express.Response) => {
        (async() => {
            try {
                const schoolIdString = req.params.schoolId as string;
                const schoolId = parseInt(schoolIdString);

                if(isNaN(schoolId)){
                    res.status(400).send("School Id must be a number")
                } else {
                    const school = await schoolRepository.createQueryBuilder("school")
                                                         .leftJoinAndSelect("school.reviews", "review")
                                                         .where("school.schoolId = :id", {id: schoolId}).getOne();
                    if (school === undefined) {
                        res.status(404).json({error: "Not found"}).send();
                    } else {
                        res.json(school).send();
                    }
                }
            } catch(err){
                console.log(err);
                res.status(500).json({error: "Internal server error"}).send();
            }
        })();
    };



    return {
        getAllSchools,
        getSchoolById
    };
}
*/