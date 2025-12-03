import express from "express";
import RekamMedisController from "#controllers/rekam_medis_controller.js";

const router = express.Router();

router.get("/rekammedis", RekamMedisController.getAll);
router.get("/rekammedis/:id", RekamMedisController.getById);
router.post("/rekammedis", RekamMedisController.create);
router.put("/rekammedis/:id", RekamMedisController.update);
router.delete("/rekammedis/:id", RekamMedisController.delete);

export default router;
