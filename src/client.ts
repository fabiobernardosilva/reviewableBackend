// REVIEW SERVICES


// Public
// POST
// Create review
async function createReview(
    reviewerName: string, //this is the reviewer name
    email: string,
    dOB: string,
    recommendation: number,
    teacher: number,
    facilities: number,
    staff: number,
    comment: string,
    schoolSchoolId: number,
    verificationStatus: number,
    postStatus: number
) {

    const data = {
        // Identification info
        reviewerName: reviewerName,
        email: email,
        dOB: dOB,
        
        // Review info
        recommendation: recommendation,
        teacher: teacher,
        facilities: facilities,
        staff: staff,
        comment: comment,
        schoolSchoolId: schoolSchoolId,

        //other
        verificationStatus: verificationStatus,
        postStatus: postStatus
    };

    const response = await fetch("/reviews",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    const json = await response.json();
    return json;
};

// Not used in this version of the project // Private (admin / system)
// GET
// Retrieve all reviews
async function getAllReviews(){
    const response = await fetch("/reviews");
    const json = await response.json();
    return json;
};

// Not used in this version of the project // Private (admin / system)
// GET
// Retrieve review by Id
async function getReviewById(id: number) {
    const response = await fetch(`/reviews/${id}`);
    const json = await response.json();
    return json;
};

// Private (admin / system)
// DELETE
// Delete review by Id
async function deleteReviewById(id: number){
    const response = await fetch(
        `/reviews/${id}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    const json = await response.json();
    return json;
};

// SCHOOL SERVICES

// Private (admin / system)
// POST
// Create school
async function createSchool(schoolName: string, website: string){

    const data = {
        schoolName: schoolName,
        website: website
    };

    const response = await fetch("/schools",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const json = await response.json();
    return json;
};

// Public
// GET
// Retrieve all schools
async function getAllSchools(){
    const response = await fetch("/schools");
    const json = await response.json();
    return json;
};

// Public
// GET
// Retrieve school by Id
async function getSchoolById(id: number){
    const response = await fetch(`/schools/${id}`);
    const json = response.json();
    return json;
};

// private (admin / system)
// DELETE
// Delete school by Id
async function deleteSchoolById(id: number) {
    const response = await fetch(`/schools/${id}`,
    {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }

    });
    const json = response.json();
    return json;
};

/*
*/

//  REVIEW SERVICES

// Public
// POST
// Create review
(async () => {

    const review = {
        reviewerName: "Hiu",
        dOB: "01/01/1990",
        recommendation: true,
        teacher: "excellent",
        facilities: "excellent",
        staff: "excellent",
        comment: "This is the best school in Dublin",
        schoolSchoolId: 2,
        email: "hiu@gmail.com",
    };

    const response = await fetch(
        "http://localhost:3000/reviews",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(review)
        }
    );

    const json = await response.json();
    console.log(json);
})();

// Not used in this version of the project // Private (admin / system)
// GET
// Retrieve all reviews
(async () => {
    const response = await fetch(
        "http://localhost:3000/reviews/",
        {
            method: "GET"
        }
    );
    const json = await response.json();
    console.log(json);
})();

// SCHOOL SERVICES

// Private (admin / system)
// POST
// Create school
(async () => {

    const school = {
        schoolName: "Dublin English",
        website: "dublinenglish.ie",
    };

    const response = await fetch(
        "http://localhost:3000/schools",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(school)
        }
    );

    const json = await response.json();
    console.log(json);
})();

// Private (admin / system)
// PUT
// Fully update school
(async () => {
    const school = {
        schoolId: 1,
        schoolName: "Dublin English",
        website: "dublinenglish.ie",
    };
    const response = await fetch(
        "http://localhost:3000/schools/0",
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(school)
        }
    );
    const json = await response.json();
    console.log(json);
})();

// Private (admin / system)
// DELETE
// Delete school
(async () => {
    const response = await fetch(
        "http://localhost:8080/schools/0",
        {
            method: "DELETE"
        }
    );
    const json = await response.json();
    console.log(json);
})();