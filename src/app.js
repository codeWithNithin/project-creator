import express from "express";
import healthCheckrouter from "./routes/healthcheck.routes.js";

const app = express();

app.use('/api/v1/health-check', healthCheckrouter)

export default app;