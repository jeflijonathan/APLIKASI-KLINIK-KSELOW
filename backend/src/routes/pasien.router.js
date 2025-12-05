import express from "express";
import PasienController from "#controllers/pasien.controller.js";

const router = express.Router();

router.get("/pasien", PasienController.getAllPasien);
router.get("/pasien/:id", PasienController.getByIdPasien);
router.post("/pasien", PasienController.createPasien);
router.get("/options/pasien", PasienController.getPasienOptions);
router.put("/pasien/:id", PasienController.updatePasien);
export default router;
