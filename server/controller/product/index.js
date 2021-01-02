const { Product } = require("../../models");

class Controller {
  static productList = async (req, res) => {
    const product = await Product.findAll();
    return res.status(200).json(product);
  };

  static addProduct = async (req, res) => {
    const {
      product_name,
      price,
      small,
      medium,
      large,
      x_large,
      image,
    } = req.body;
    const newProduct = await Product.create({
      product_name,
      price,
      small,
      medium,
      large,
      x_large,
      image,
    });
    return res.status(201).json(newProduct);
  };

  static editProduct = async (req, res) => {
    const {
      product_name,
      price,
      small,
      medium,
      large,
      x_large,
      image,
    } = req.body;
    const { productId } = req.params;
    const edited = await Product.update(
      { product_name, price, small, medium, large, x_large, image },
      { where: { id: productId } }
    );
    return res.status(200).json(edited);
  };

  static oneProduct = async (req, res) => {
    const { productId } = req.params;
    const product = await Product.findOne({ where: { id: productId } });
    return res.status(200).json(product);
  };

  static deleteProduct = async (req, res) => {
    const { productId } = req.params;
    const deleted = await Product.destroy({ where: { id: productId } });
    return res.status(200).json({ message: `success deleting product` });
  };
}

module.exports = Controller;
