const express = require("express");
const { verifyAdmin } = require("../middleware/verifyAdmin");
const { verifyJWT } = require("../middleware/verifyJWT");
const {
    adminGetCategory,
} = require("../controller/admin-product/admin_getCategory");
const { addCategory } = require("../controller/admin-product/addCategory");
const {
    updateCategory,
} = require("../controller/admin-product/updateCategory");
const { addProduct } = require("../controller/admin-product/addProduct");
const { allProduct } = require("../controller/admin-product/allProduct");
const {
    deleteCategory,
} = require("../controller/admin-product/deleteCategory");
const { editItem } = require("../controller/admin-product/editItem");
const { deleteItem } = require("../controller/admin-product/deleteItem");
const { getProducts } = require("../controller/admin-product/getProducts");
const { verifyForbidden } = require("../middleware/verifyForbidden");
const { displayProductPurchase, monthlyRevenue } = require("../controller/admin-product/dashboard");
const adminProductRouter = express.Router();

adminProductRouter.get(
    "/get-products",
    verifyJWT,
    verifyAdmin,
    verifyForbidden,
    adminGetCategory
);

adminProductRouter.post(
    "/add-category",
    verifyJWT,
    verifyAdmin,
    verifyForbidden,
    addCategory
);

adminProductRouter.put(
    "/edit-category",
    verifyJWT,
    verifyAdmin,
    verifyForbidden,
    updateCategory
);

adminProductRouter.post(
    "/add-product",
    verifyJWT,
    verifyAdmin,
    verifyForbidden,
    addProduct
);
adminProductRouter.get(
    "/all-product",
    verifyJWT,
    verifyAdmin,
    verifyForbidden,
    allProduct
);
adminProductRouter.delete(
    "/delete-category",
    verifyJWT,
    verifyAdmin,
    verifyForbidden,
    deleteCategory
);
adminProductRouter.post(
    "/edit-item",
    verifyJWT,
    verifyAdmin,
    verifyForbidden,
    editItem
);
adminProductRouter.delete(
    "/delete-item",
    verifyJWT,
    verifyAdmin,
    verifyForbidden,
    deleteItem
);
adminProductRouter.post(
    "/get-products",
    verifyJWT,
    verifyAdmin,
    verifyForbidden,
    getProducts
);

adminProductRouter.get("/product-purchase", verifyJWT, verifyAdmin, verifyForbidden, displayProductPurchase);
adminProductRouter.post("/yearly-revenue-by-month", verifyJWT, verifyAdmin, verifyForbidden, monthlyRevenue);

module.exports = { adminProductRouter };
