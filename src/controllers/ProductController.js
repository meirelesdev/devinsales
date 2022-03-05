const Product = require("../models/Product");
const { validateErrors } = require("../utils/functions");
const { Op } = require("sequelize");
const { send } = require("express/lib/response");

module.exports = {
  async index(req, res) {
    // #swagger.tags = ['Produto']
    // #swagger.description = 'Endpoint para buscar produtos conforme critério query params'

    try {
      const { name, price_min, price_max } = req.query;
      const query = {};
      if (name) {
        query.name = { [Op.iLike]: `%${name}%` };
      }
      const priceMin = Number(price_min) ? Number(price_min) : 0;
      const priceMax = Number(price_max)
        ? Number(price_max)
        : Number.MAX_SAFE_INTEGER;

      if (priceMax <= priceMin) {
        return res.status(400).json({
          message: "Price max must be greater than price min",
        });
      }
      query.suggested_price = {
        [Op.between]: [priceMin, priceMax],
      };

      const products = await Product.findAll({
        attributes: ["id", "name", "suggested_price"],
        where: query,
      });

      if (products.length === 0) return res.status(204).send();

      return res.status(200).send({ products });
    } catch (error) {
      const message = validateErrors(error);
      return res.status(400).send(message);
    }
  },

  async store(req, res) {
    // #swagger.tags = ['Produto']
    // #swagger.description = 'Endpoint para criar um novo produto.'
    try {
      const newProduct = req.body;

      const productExist = await Product.findOne({
        where: {
          name: newProduct.name,
        },
      });
      if (productExist) {
        return res
          .status(400)
          .send({ message: "Já existe um produto com esse mesmo nome." });
      }

      if (newProduct.suggested_price <= 0) {
        return res
          .status(400)
          .send({ message: "O preço deve ser maior que zero." });
      }
      const product = await Product.create(newProduct);

      return res.status(200).send({
        message: "Produto criado com sucesso!",
        novoProduto: product,
      });
    } catch (error) {
      const message = validateErrors(error);
      return res.status(400).send(message);
    }
  },
};
