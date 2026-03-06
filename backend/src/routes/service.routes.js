import express from "express";
import {
  addService,
  getServices,
} from "../controllers/service.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";

const router = express.Router();

router.get("/", getServices);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("vendor"),
  addService
);

export default router;
