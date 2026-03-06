import express from "express";
import { createPaymentOrder } from "../controllers/payment.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { generateInvoice } from "../controllers/payment.controller.js";
const router = express.Router();

router.post(
  "/create-order",
  authMiddleware,
  createPaymentOrder
);

router.post(
  "/invoice",
  authMiddleware,
  generateInvoice
);


export default router; 
