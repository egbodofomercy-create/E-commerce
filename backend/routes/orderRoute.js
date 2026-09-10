import express from "express";

import {
  createOrder,
  getOrders,
  getOrderById,
  getAllOrders,
  getAdminOrderById,
  updateOrderStatus,
} from "../controllers/orderController.js";

import authUser from "../middleware/auth.js";
import authAdmin from "../middleware/authAdmin.js";

const orderRouter = express.Router();


/* ================= CUSTOMER ROUTES ================= */

orderRouter.post(
  "/create",
  authUser,
  createOrder
);

orderRouter.get(
  "/list",
  authUser,
  getOrders
);

orderRouter.get(
  "/single/:id",
  authUser,
  getOrderById
);


/* ================= ADMIN ROUTES ================= */

orderRouter.get(
  "/admin/list",
  authAdmin,
  getAllOrders
);

orderRouter.get(
  "/admin/single/:id",
  authAdmin,
  getAdminOrderById
);

orderRouter.put(
  "/admin/status/:id",
  authAdmin,
  updateOrderStatus
);


export default orderRouter;