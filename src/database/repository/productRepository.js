const ProductModel = require("../Models/productModel");

class ProductRepository {
  async createProduct(productInfo) {
    try {
      const newProduct = new ProductModel(productInfo);
      const productResult = await newProduct.save();
      return productResult;
    } catch (error) {
      throw error;
    }
  }

  async getAllProduct() {
    try {
      const product = await ProductModel.find().populate('createdBy');
      return product;
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const products = await ProductModel.findOne({ _id: id });
      return products;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductRepository;
