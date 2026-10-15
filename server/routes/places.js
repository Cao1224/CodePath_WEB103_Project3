import express from "express";
import placesController from "../controllers/places.js";

const router = express.Router();

router.get("/", placesController.getAllPlaces);

// Keep this route before "/:id"
router.get(
    "/location/:location",
    placesController.getPlacesByLocation
);

router.get("/:id", placesController.getPlaceById);

router.post("/", placesController.createPlace);
router.put("/:id", placesController.updatePlace);
router.delete("/:id", placesController.deletePlace);

export default router;