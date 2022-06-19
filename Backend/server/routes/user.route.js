import express from "express";
import UserController from "../controllers/user.controller";
import { isLoggedIn } from "../middlewares/authenticate";
import {
  registerValidator,
  loginValidator,
} from "../middlewares/user.middleware";

const userRouter = express.Router();

userRouter.post(
  "/auth/register",
  registerValidator,
  UserController.createUserHandler
);
userRouter.post("/auth/login", loginValidator, UserController.loginHandler);

export default userRouter;
