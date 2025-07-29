import express from "express";
import { getAllUsers, updateUserRole } from "../controllers/user.controller.js";

import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

const router = express.Router();

// User routes
router.get("/", auth, getAllUsers);
/* router.get("/:id", auth); */
router.put("/:id", auth, admin, updateUserRole);
/* router.delete("/:id", auth, admin); */

export default router;
