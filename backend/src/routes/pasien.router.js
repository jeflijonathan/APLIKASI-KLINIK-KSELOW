import express from "express";
import PasienController from "#controllers/pasien.controller.js";

const router = express.Router();

router.get("/pasien", PasienController.getAllPasien);
router.post("/pasien", PasienController.createPasien);
router.get("/pasien/options", PasienController.getPasienOptions);
export default router;
