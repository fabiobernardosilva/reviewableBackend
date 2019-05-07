import express from 'express';
import bodyParser from 'body-parser'
import { createDbConnection } from './config/db';
import { getSchoolController } from './controllers/school_controller';
import { getReviewController } from './controllers/review_controller';
import { getAuthController } from './controllers/auth_controller';
import { getUserController } from './controllers/user_controller';

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
    const authController = getAuthController();
    const userController = getUserController();

    app.use("/api/v1/auth", authController);
    app.use("/api/v1/reviews", reviewsController);
    app.use("/api/v1/schools", schoolsController);
    app.use("/api/v1/users", userController);

    return app;
}