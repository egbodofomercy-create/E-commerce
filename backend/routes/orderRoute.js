import express from "express";

import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/orderController.js";

const orderRouter = express.Router();


/* ================= CREATE ORDER ================= */

orderRouter.post(
  "/create",
  createOrder
);


/* ================= GET ALL ORDERS ================= */

orderRouter.get(
  "/list",
  getOrders
);


/* ================= GET SINGLE ORDER ================= */

orderRouter.get(
  "/single/:id",
  getOrderById
);


/* ================= UPDATE ORDER STATUS ================= */

orderRouter.put(
  "/status/:id",
  updateOrderStatus
);


export default orderRouter;