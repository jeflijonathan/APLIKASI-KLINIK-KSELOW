import express from "express";
import PasienController from "#controllers/pasien.controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/pasien", auth, PasienController.getAllPasien);
router.get("/pasien/:id", auth, PasienController.getByIdPasien);
router.post("/pasien", auth, PasienController.createPasien);
router.get("/options/pasien", auth, PasienController.getPasienOptions);
router.put("/pasien/:id", auth, PasienController.updatePasien);
export default router;
