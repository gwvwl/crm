const { ProductDB, CategoryDB } = require("../database/modelDB");
const { logger } = require("../utils/logger");

class ProductModel {
  static async createProduct({ name, category_id }) {
    try {
      const [product] = await ProductDB.findOrCreate({
        where: { name },
        defaults: { name },
      });
      await product.setCategory(category_id);
      //   console.log(Object.getPrototypeOf(product));

      return product;
    } catch (error) {
      logger.error("Error creating product:", error);
      throw error;
    }
  }

  static async getProductById(id) {
    try {
      const product = await ProductDB.findByPk(id);
      return product;
    } catch (error) {
      logger.error("Error getting product by ID:", error);
      throw error;
    }
  }

  static async getProductByCategory(category_id) {
    try {
      const products = await ProductDB.findAll({
        where: { category_id: category_id },
      });
      return products;
    } catch (error) {
      logger.error("Error getting all product:", error);
      throw error;
    }
  }
}
// ProductModel.createProduct({ name: "test2121", category_id: 1 });
module.exports = ProductModel;
