const express = require('express');
const { getCategory } = require('../controller/Product/getCategory');
const { productDetails } = require('../controller/Product/productDetails');
const { verifyJWT } = require('../middleware/verifyJWT');
const { cart, cartCheck, cartRemove, allCart, productQuantityInc, productQuantityDec, specificCategoryCartCheck } = require('../controller/Cart/Cart');
const { getProductList } = require('../controller/Product/getProductList');
const { initPayment, successPayment } = require('../controller/Payment/Payment');
const { verifyForbidden } = require('../middleware/verifyForbidden');
const productRouter = express.Router();

productRouter.get("/get-category", getCategory);
productRouter.get("/product-details/:id", productDetails);
productRouter.post("/add-cart", verifyJWT,verifyForbidden, cart)
productRouter.post("/cart-check", verifyJWT, verifyForbidden, cartCheck);
productRouter.delete('/remove-cart', verifyJWT, verifyForbidden, cartRemove);
productRouter.post("/get-products", getProductList)
productRouter.post("/cart-check-from-user", verifyJWT,verifyForbidden, specificCategoryCartCheck);
productRouter.get("/all-cart", verifyJWT,verifyForbidden, allCart);
productRouter.put("/product-quantity/inc", verifyJWT,verifyForbidden, productQuantityInc);
productRouter.put("/product-quantity/dec", verifyJWT,verifyForbidden, productQuantityDec);
productRouter.post('/api/payment', verifyJWT,verifyForbidden, initPayment);
productRouter.post("/api/payment/success/:trxID",successPayment);
productRouter.post ("/api/payment/fail/:trxID", )

module.exports= {productRouter};