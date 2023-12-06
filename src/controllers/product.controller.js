const ProductModel = require("../models/product.model");
// ProductModel.createProduct({ name: "test3", category_id: 1 });
// ProductModel.getProductByCategory(1);

exports.createProduct = async (req, res) => {
  const { category_id, name } = req.body;

  const product = await ProductModel.createProduct({
    name,
    category_id,
  });

  res.status(200).json({
    success: true,
    message: "Product created",
    product,
    img_path,
  });
};

exports.getProducts = async (req, res) => {
  const { id } = req.query;

  if (id) {
    const products = await ProductModel.getProductByCategory(id);
    res
      .status(200)
      .json({ success: true, message: "Products retrieved", products });
  } else {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, category_id } = req.body;

  const product = await ProductModel.getProductById(id);

  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  product.name = translation.en.name || product.name;
  product.category_id = category_id || product.category_id;

  await product.save();

  res.status(200).json({ success: true, message: "Product updated", product });
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await ProductModel.getProductById(id);

  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  await product.destroy();

  res.status(200).json({ success: true, message: "Product deleted" });
};
