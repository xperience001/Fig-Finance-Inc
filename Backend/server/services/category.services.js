import Category from "../model/category.model";

export async function addCategory(body, res) {
  try {
    const { name } = body;
    const category = await Category.findOne({ name });
    if (category) {
      res.status(409);
      throw new Error("category already exists");
    }

    return await Category.create({ name });
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAllCategories() {
  try {
    return await Category.find().select("-createdAt -updatedAt");
  } catch (error) {
    throw new Error(error);
  }
}
