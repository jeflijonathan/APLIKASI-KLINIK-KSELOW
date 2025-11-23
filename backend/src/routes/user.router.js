import express from "express";
import UserController from "#controllers/user.controller.js";

const router = express.Router();

router.get("/users", UserController.getAllUsers);

export default router;
