import { createApp } from './app';

(async () => {
    // Self-invoked function that created the app
    const app = await createApp();

    // Define port number and callback function
    const port = 8080;
    const ready = () => {
        console.log(`reviewableBackend is running on port ${port}!`);
    }

    // Start the server
    app.listen(port, ready);
})();