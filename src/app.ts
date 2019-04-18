import express from 'express';
import bodyParser from 'body-parser'
import { createDbConnection } from './config/db';
import { getSchoolController } from './controllers/school_controller';
import { getReviewController } from './controllers/review_controller';

/**
 * This async function calls for the creating of the Database Connection,
 * creates the Express app and configures it to use JSON.
 * It also declares the main path for the application and declares the controllers used.
 * It returns the created app.
 */
export async function createApp() {

    // Creates DB connection
    await createDbConnection();

    // Creates app
    const app = express();

    // Server config to be able to send JSON
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Declare the main path
    app.get('/api/v1/', (req, res) => {
        res.send('Hello world, welcome to the reviewable API!');
    });

    // Declare controllers
    const schoolsController = getSchoolController();
    const reviewsController = getReviewController();
    app.use("/reviews", reviewsController);
    app.use("/schools", schoolsController);

    return app;
}