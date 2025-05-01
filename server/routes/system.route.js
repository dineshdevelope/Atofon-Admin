import express from "express";
import {
  createSystem,
  getAllSystems,
  getSystemById,
  updateSystem,
  deleteSystem,
} from "../controllers/system.controller.js";

import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

const router = express.Router();

// System routes
router.post("/", auth, admin, createSystem);
router.get("/", auth, getAllSystems);
router.get("/:id", auth, getSystemById);
router.put("/:id", auth, admin, updateSystem);
router.delete("/:id", auth, admin, deleteSystem);

export default router;
