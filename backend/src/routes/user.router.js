import express from "express";
import UserController from "#controllers/user.controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", auth, UserController.register);
router.post("/login", UserController.login);
router.get("/users", auth, UserController.getAllUsers);
router.get("/users/:id", auth, UserController.getUserById);
router.put("/users/:id", auth, UserController.updateUser);
router.delete("/users/:id", auth, UserController.deleteUser);

export default router;
