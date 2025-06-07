// ----------Product Controller----------
const { Product } = require("../models/productSchema");

// ----------postProduct----------
exports.postProduct = async (req, res) => {
  try {
    const { name, description, photo, price, count } = req.body;
    const existingProduct = await Product.findOne({ name });

    if (existingProduct) {
      return res.status(400).json({
        message: "Product already exists!",
      });
    } else {
      const newProduct = new Product({
        name,
        description,
        photo,
        price,
        count,
      });
      await newProduct.save();

      return res.status(201).json({
        success: true,
        message: "Product successfully added!",
        data: newProduct,
      });
    }
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

// ----------getProduct----------
exports.getProduct = async (req, res) => {
  try {
    const products = await Product.find({});

    return res.status(200).json({
      success: true,
      message: "Product list retrieved successfully!",
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

// ----------getProductById----------
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Product found successfully!",
        data: product,
      });
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

// ----------updateProduct----------
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, photo, price, count } = req.body;

    const product = await Product.findByIdAndUpdate(
      id,
      { name, description, photo, price, count },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Product updated successfully!",
        data: product,
      });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

// ----------deleteProduct----------
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Product deleted successfully!",
      });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};
