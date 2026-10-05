import express from "express";
import placesController from "../controllers/places.js";

const router = express.Router();

router.get("/", placesController.getAllPlaces);
router.get("/:id", placesController.getPlaceById);
router.post("/", placesController.createPlace);
router.put("/:id", placesController.updatePlace);
router.delete("/:id", placesController.deletePlace);

export default router;