import express from "express";
import {
  getAllEmployees,
  getSingleEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employee.controller.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

const router = express.Router();

router.get("/", auth, getAllEmployees);
router.get("/:id", auth, getSingleEmployee);
router.post("/", auth, admin, createEmployee);
router.put("/:id", auth, admin, updateEmployee);
router.delete("/:id", auth, admin, deleteEmployee);

export default router;
