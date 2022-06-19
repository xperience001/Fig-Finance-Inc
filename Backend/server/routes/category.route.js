import express from "express";
import CategoryController from "../controllers/category.controller";
import { isLoggedIn, isAdmin } from "../middlewares/authenticate";
import { addCategoryValidator } from "../middlewares/category.middleware";

const categoryRouter = express.Router();

categoryRouter.post(
  "/categories",
  isLoggedIn,
  isAdmin,
  addCategoryValidator,
  CategoryController.addCategoryHandler
);
categoryRouter.get("/categories", CategoryController.getAllCategoriesHandler);

export default categoryRouter;
