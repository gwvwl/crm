// const { CategoryDB, ProductDB } = require("../database/modelDB");
// const { logger } = require("../utils/logger");
// class CategoryModel {
//   static async createCategory({ name, parentSub_id = null }) {
//     try {
//       const [category] = await CategoryDB.findOrCreate({
//         where: { name },
//         defaults: { name, parentSub_id },
//       });

//       return category;
//     } catch (error) {
//       logger.error("Error creating category:", error);
//       throw error;
//     }
//   }

//   static async getCategoryById(id) {
//     try {
//       const category = await CategoryDB.findByPk(id);
//       return category;
//     } catch (error) {
//       logger.error("Error getting category by ID:", error);
//       throw error;
//     }
//   }

//   static async updateCategory({ id, name, parentSub_id }) {
//     try {
//       const category = await CategoryDB.findByPk(id);
//       if (!category) {
//         return null;
//       }
//       category.name = name || category.name;
//       category.parentSub_id = parentSub_id || category.parentSub_id;
//       await category.save();
//       return category;
//     } catch (error) {
//       logger.error("Error updating category:", error);
//       throw error;
//     }
//   }
//   static async getAllCategories(parentCategoryId = null) {
//     try {
//       const categories = await CategoryDB.findAll({
//         where: {
//           parentSub_id: parentCategoryId,
//         },
//         attributes: { exclude: ["createdAt", "updatedAt"] },
//       });
//       const categoryTree = [];
//       for (const category of categories) {
//         const subcategories = await this.getAllCategories(category.id);
//         const categoryData = {
//           id: category.id,
//           name: category.name,
//           parentSub_id: category.parentSub_id,
//         };
//         if (subcategories.length > 0) {
//           categoryData.subcategories = subcategories;
//         }
//         categoryTree.push(categoryData);
//       }

//       return categoryTree;
//     } catch (error) {
//       logger.error("Error getting categories:", error);
//       throw error;
//     }
//   }
//   static async deleteCategory(categoryId) {
//     try {
//       const category = await CategoryDB.findByPk(categoryId);
//       if (!category) {
//         return null;
//       }
//       await category.destroy();
//       return category;
//     } catch (error) {
//       logger.error("Error deleting category:", error);
//       throw error;
//     }
//   }
// }

// module.exports = CategoryModel;
