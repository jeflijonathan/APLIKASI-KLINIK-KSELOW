import express from "express";
import PasienController from "#controllers/pasien.controller.js";

const router = express.Router();

router.get("/pasien", PasienController.getAllPasien);

export default router;
