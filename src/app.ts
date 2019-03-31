import express from 'express';
import bodyParser from 'body-parser'
import { createDbConnection } from './config/db';
import { getSchoolController } from './controllers/school_controller';
import { getReviewController } from './controllers/review_controller';

export async function createApp() {

    // Create DB connection
    await createDbConnection();

    // Creates app
    const app = express();

    // Server config to be able to send JSON
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    // Declare the main path
    app.get('/', (req, res) => {
        res.send('Hello world, welcome to reviewable!');
    });

    // Declare controllers
    const schoolsController = getSchoolController();
    const reviewsController = getReviewController();
    app.use("/reviews", reviewsController);
    app.use("/schools", schoolsController);

    return app;
}