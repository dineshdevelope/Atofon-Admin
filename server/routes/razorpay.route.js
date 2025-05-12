import express from "express";
import {
  getKey,
  paymentVerification,
  processPayment,
} from "../controllers/razorpay.controller.js";
const router = express.Router();

router.post("/payment/process", processPayment);

router.get("/getKey", getKey);

router.post("/paymentVerification", paymentVerification);

export default router;
