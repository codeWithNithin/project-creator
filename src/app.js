import express from "express";
import cookieParser from "cookie-parser";
// import cors from "cors";
import healthCheckrouter from "./routes/healthcheck.routes.js";
import authRouter from "./routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1/healthcheck', healthCheckrouter)
app.use('/api/v1/users', authRouter)

export default app;