import { Router } from "express";
import { healthCheck } from "../controllers/healthchecker.controllers.js";

const healthCheckrouter = Router();

healthCheckrouter.route('/').get(healthCheck);

export default healthCheckrouter