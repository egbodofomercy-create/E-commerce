import express from "express";

import {
  addToCart,
  removeFromCart,
  getUserCart,
  clearCart,
} from "../controllers/cartController.js";

import authUser from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add", authUser, addToCart);

cartRouter.post("/remove", authUser, removeFromCart);

cartRouter.post("/get", authUser, getUserCart);

cartRouter.post("/clear", authUser, clearCart);

export default cartRouter;