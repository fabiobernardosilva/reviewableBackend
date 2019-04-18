import express from "express"
import { getSchoolRepository } from "../repositories/school_repository";

/** 
 * This function gets the School repository and creates an Express Router.
 * This router then, uses HTTP methods, such as GET and POST to retrieve or save schools.
 * Each internal operation makes use of HTTP requests and responses to perform those actions,
 * with responses being formatted as JSON. Finally, this function then, returns the router.
 */
export function getSchoolController() {
    const schoolRepository = getSchoolRepository();

    const router = express.Router();

    // Returns all schools
    router.get("/", (req, res) => {
        (async () => {
            const schools = await schoolRepository.find();
            res.json(schools);
        })();
    });

    // Returns school by Id
    router.get("/:schoolId", (req, res) => {

        (async () => {
            const schoolIdString = req.params.schoolId as string;
            const schoolIdNumber = parseInt(schoolIdString);
            if (isNaN(schoolIdNumber)) {
                res.status(400).send("School ID must be a number!")
            } else {
                const school = await schoolRepository.findOne(schoolIdNumber, { relations: ["reviews"] });
                res.json(school);
            }
        })();

    });

    // Creates a new school
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

    // Fully edits / update a school by Id
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

    // Deletes a school by Id
    router.delete("/:schoolId", (req, res) => {
        (async () => {
            const schoolIdString = req.params.schoolId as string;
            schoolRepository.delete(schoolIdString);
            res.json(true);
        })();
    });

    // Patches / partially edits a school by Id
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