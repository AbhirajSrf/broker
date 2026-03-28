import express from "express";
import {
  createProperty,
  getProperties,
  getFavourites,
  toggleLike,
  toggleFavourite,
} from "../controllers/property.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", createProperty);
router.get("/favourites", protectRoute, getFavourites);
router.get("/", getProperties);
router.post("/:id/like", protectRoute, toggleLike);
router.post("/:id/favourite", protectRoute, toggleFavourite);

export default router;
