const express = require('express');
const { getCategory } = require('../controller/Product/getCategory');
const productRouter = express.Router();

productRouter.get("/get-category", getCategory);

module.exports= {productRouter};