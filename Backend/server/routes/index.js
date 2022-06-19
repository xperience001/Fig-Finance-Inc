import categoryRouter from "./category.route";
import express from "express";
import eventRouter from "./event.route";
import userRouter from "./user.route";
import { successResponse } from "../helpers/responseUtil";

const router = express.Router();

router.get("/", (req, res) => {
  successResponse(res, 200, "Welcome to API");
});

router.use("/", userRouter);
router.use("/", eventRouter);
router.use("/", categoryRouter);

router.all("*", (req, res) => {
  res.status(404);
  throw new Error("404 route not found.");
});

export default router;
