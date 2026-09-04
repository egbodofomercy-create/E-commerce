import express from "express";
import authUser from "../middleware/auth.js";
import {addToCart,removeFromCart,getUserCart,} from "../controllers/cartController.js";
const cartRouter = express.Router();

cartRouter.post("/add", authUser, addToCart);
cartRouter.post("/remove", authUser, removeFromCart);
cartRouter.post("/get", authUser, getUserCart);
export default cartRouter;