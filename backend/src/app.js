import express from "express";
import userRouter from "#routes/user.router.js";
import env from "dotenv";
import DB from "#config/db.js";

env.config();

new DB();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", userRouter);

const HOST = process.env.APP_HOST || "http://localhost";
const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${HOST}:${PORT} `));
