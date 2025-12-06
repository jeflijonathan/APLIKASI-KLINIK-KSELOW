import express from "express";
import RekamMedisController from "#controllers/rekam_medis_controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/rekammedis", auth, RekamMedisController.getAll);
router.get("/rekammedis/:id", auth, RekamMedisController.getById);
router.post("/rekammedis", auth, RekamMedisController.create);
router.put("/rekammedis/:id", auth, RekamMedisController.update);
router.delete("/rekammedis/:id", auth, RekamMedisController.delete);

export default router;
