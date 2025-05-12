import { instance } from "../services/razorpay.instance.js";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

export const processPayment = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100), // amount in the smallest currency unit
    currency: "INR",
    receipt: "receipt#1",
    payment_capture: 1,
  };

  const order = await instance.orders.create(options);
  if (!order) return res.status(500).send("Some error occured");
  res
    .status(200)
    .json({ success: true, order, message: "Order created successfully" });
};

export const getKey = async (req, res) => {
  res.status(200).json({
    key: process.env.RAZORPAY_API_KEY,
    message: "Key fetched successfully",
  });
};

export const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");
  const isAuthentic = expectedSignature === razorpay_signature;
  if (isAuthentic) {
    return res.redirect(
      `${process.env.BASE_FRONTEND_URL}/paymentSuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(500).json({
      success: false,
      message: "Payment verification failed",
      data: req.body,
    });
  }
};
