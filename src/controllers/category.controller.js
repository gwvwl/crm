const CategoryModel = require("../models/category.model");

exports.createCategory = async (req, res) => {
  const { name, parentSub_id } = req.body;
  const category = await CategoryModel.createCategory({
    name,
    parentSub_id: parentSub_id || null,
  });

  res
    .status(200)
    .json({ success: true, message: "Category created", category });
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.getAllCategories();

    res.status(200).json({
      success: true,
      message: "Categories retrieved",
      data: categories,
    });
  } catch (error) {
    console.error("Error getting categories:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve categories" });
  }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { parentSub_id, name } = req.body;

  const category = await CategoryModel.updateCategory({
    id,
    parentSub_id,
    name,
  });

  if (!category) {
    return res
      .status(404)
      .json({ success: false, message: "Category not found" });
  }

  res
    .status(200)
    .json({ success: true, message: "Category updated", category });
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  const category = await CategoryModel.deleteCategory(id);

  if (!category) {
    return res
      .status(404)
      .json({ success: false, message: "Category not found" });
  }

  res.status(200).json({ success: true, message: "Category deleted" });
};

// CategoryModel.getAllCategories()
//   .then((categoryTree) => {
//     console.log(categoryTree);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });
// const create1 = async () => {
//   const first = await CategoryModel.createCategory({ name: "tesdsdsst1" });
//   console.log(first.id);
//   const secound = await CategoryModel.createCategory({
//     name: "tesdsdsst2",
//     parentSub_id: first.id,
//   });
//   const third = await CategoryModel.createCategory({
//     name: "testdsds3",
//     parentSub_id: secound.id,
//   });
// };
// create1();
