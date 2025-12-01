import express from "express";
import userRouter from "#routes/user.router.js";
import pasienRouter from "#routes/pasien.router.js";
import env from "dotenv";
import DB from "#config/db.js";
import rekamMedisRouter from "#routes/rekam_medis_router.js";

env.config();
new DB();
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", userRouter);
app.use("/api", pasienRouter);
app.use("/api", rekamMedisRouter);

const HOST = process.env.APP_HOST || "http://localhost";
const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${HOST}:${PORT} `));
