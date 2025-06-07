const { Router } = require("express"); // ----------Router
const product = Router(); // ----------Product

const {
  postProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller"); // ----------Controllers

// ----------Paths-----------
product.post("/postProduct", postProduct);
product.get("/getProduct", getProduct);
product.get("/getProduct/:id", getProductById);
product.put("/updateProduct/:id", updateProduct);
product.delete("/deleteProduct/:id", deleteProduct);

module.exports = { product }; // ----------Exports
