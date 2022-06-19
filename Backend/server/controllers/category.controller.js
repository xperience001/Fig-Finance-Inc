import { successResponse } from "../helpers/responseUtil";
import { addCategory, getAllCategories } from "../services/category.services";

class CategoryController {
  static async addCategoryHandler(req, res, next) {
    try {
      const category = await addCategory(req.body, res);
      return successResponse(res, 201, "category added", category);
    } catch (error) {
      next(error);
    }
  }

  static async getAllCategoriesHandler(req, res, next) {
    try {
      const categories = await getAllCategories();
      return successResponse(res, 200, "categories retrieved", { categories });
    } catch (error) {
      next(error);
    }
  }
}

export default CategoryController;
