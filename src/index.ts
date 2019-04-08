import {createApp} from './app';

(async() => {
    const app = await createApp();

    // Define port number and callback function
    const port = 8080;
    const ready = () => {
        console.log(`reviewableBackend is running on port ${port}!`);
    }

    // Start the server
    app.listen(port,ready);
})();

/*import express from "express"
import bodyParser from "body-parser";
import { createDbConnection } from "./config/db";
import { getSchoolController } from "./controllers/school_controller";
import { getReviewController } from "./controllers/review_controller";



(async () => {
    await createDbConnection();

    // Creates app
    const app = express();

    // Use the body parse middleware so we can send JSON
    // In the HTTP requests body
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Declare the homepage endpoint
    app.get("/", (req, res) => {
        res.send('Hello world, welcome to reviewable!')
    });

    const schoolsController = getSchoolController();
    const reviewsController = getReviewController();
    app.use("/reviews", reviewsController);
    app.use("/schools", schoolsController);

    // Run the express HTTP server in port 8080
    const port = 3000;
    app.listen(port, () => {
        console.log(`reviewable is running on port ${port}!`)
    }
    );
   
})();
*/


