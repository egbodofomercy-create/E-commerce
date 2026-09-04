import express from "express";
import authUser from "../middleware/auth.js";
import { registerUser, loginUser,getUserCount,getAllUsers } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/count", getUserCount);
userRouter.get("/list", getAllUsers);
userRouter.post("/test", authUser, (req, res) => {
  res.json({
    success: true,
    message: "Authentication successful",
    userId: req.body.userId,
  });
});
export default userRouter;