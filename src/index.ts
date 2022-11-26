import "dotenv/config";
import validateEnv from "./utils/validate_env";
import App from "./app";

import AuthController from "./controllers/auth.controller";
// import CRUDController from "./controllers/crud.controller"; // (Disabling CRUD API's for directly use)
import AdminController from "./controllers/admin.controller";
import EvaluaterController from "./controllers/evulator.controller";

import ChallengeController from "./controllers/challenges.controller";


// validating env variables
validateEnv();

// initializing app
try {
    const app = new App([
        // new CRUDController (Disabling CRUD API's for directly use)
        new AuthController,
        new AdminController,
        new EvaluaterController,
        new ChallengeController,
    ], Number(process.env.APP_PORT));
    // starting app
    app.listen();
} catch (error) {
    console.log(error);
}