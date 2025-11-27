import express from "express";
import UserController from "#controllers/user.controller.js";

const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.get("/users", UserController.getAllUsers);
router.get("/users/:id", UserController.getUserById);

router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

export default router;
