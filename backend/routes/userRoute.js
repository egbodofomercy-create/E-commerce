import express from "express";
import authUser from "../middleware/auth.js";
import authAdmin from "../middleware/authAdmin.js";
import { registerUser, loginUser, getUserCount, getAllUsers } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/count", authAdmin, getUserCount);
userRouter.get("/list", authAdmin, getAllUsers);
userRouter.post("/test", authUser, (req, res) => {
  res.json({
    success: true,
    message: "Authentication successful",
    userId: req.body.userId,
  });
});

export default userRouter;