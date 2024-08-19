const express = require('express');
const { getCategory } = require('../controller/Product/getCategory');
const { productDetails } = require('../controller/Product/productDetails');
const { verifyJWT } = require('../middleware/verifyJWT');
const { cart, cartCheck, cartRemove, allCart, productQuantityInc, productQuantityDec, specificCategoryCartCheck } = require('../controller/Cart/Cart');
const { getProductList } = require('../controller/Product/getProductList');
const productRouter = express.Router();

productRouter.get("/get-category", getCategory);
productRouter.get("/product-details/:id", productDetails);
productRouter.post("/add-cart", verifyJWT, cart)
productRouter.post("/cart-check", verifyJWT, cartCheck);
productRouter.delete('/remove-cart', verifyJWT, cartRemove);
productRouter.post("/get-products", getProductList)
productRouter.post("/cart-check-from-user", verifyJWT, specificCategoryCartCheck);
productRouter.get("/all-cart", verifyJWT, allCart);
productRouter.put("/product-quantity/inc", verifyJWT, productQuantityInc);
productRouter.put("/product-quantity/dec", verifyJWT, productQuantityDec);

module.exports= {productRouter};