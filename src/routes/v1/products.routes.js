const ProductController = require("../../controllers/ProductController");
const express = require("express");
const productsRoutes = express.Router();
const { onlyCanAccessWith } = require("../../middlewares/auth");
const { READ, WRITE } = require("../../utils/constants/permissions");

productsRoutes.get(
  "/products",
  onlyCanAccessWith([READ]),
  ProductController.index
);
productsRoutes.post(
  "/products",
  onlyCanAccessWith([WRITE]),
  ProductController.store
);

module.exports = productsRoutes;
