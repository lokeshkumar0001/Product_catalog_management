/* eslint-disable no-underscore-dangle */
const productService = require("../../services/productService");

const service = new productService();

module.exports.addProduct = async (req, res) => {
  try {
    const productInfo = req.body;

    const data = await service.addProduct({
      ...productInfo,
      createdBy: req.user._id,
    });
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};

module.exports.getAllProduct = async (req, res) => {
  try {
    const data = await service.getAllProduct();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

module.exports.getProductById = async (req, res) => {
  try {
    const data = await service.getProductById(req.params.id);
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};
