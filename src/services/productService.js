/* eslint-disable no-useless-catch */
const ProductRepository = require("../database/repository/productRepository");

class productService {
  constructor() {
    this.repository = new ProductRepository();
  }

  async addProduct(productInfo) {
    try {
      const productResult = await this.repository.createProduct(productInfo);
      return {
        success: true,
        message: "product created",
        prodcut: productResult,
      };
    } catch (error) {
      throw error;
    }
  }

  async getAllProduct() {
    try {
      const products = await this.repository.getAllProduct();
      return { success: true, products };
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const productResult = await this.repository.getProductById(id);
      return { success: true, product: productResult };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = productService;
