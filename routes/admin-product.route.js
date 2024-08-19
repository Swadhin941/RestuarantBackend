const express = require("express");
const { verifyAdmin } = require("../middleware/verifyAdmin");
const { verifyJWT } = require("../middleware/verifyJWT");
const {
    adminGetCategory,
} = require("../controller/admin-product/admin_getCategory");
const { addCategory } = require("../controller/admin-product/addCategory");
const { updateCategory } = require("../controller/admin-product/updateCategory");
const { addProduct } = require("../controller/admin-product/addProduct");
const { allProduct } = require("../controller/admin-product/allProduct");
const { deleteCategory } = require("../controller/admin-product/deleteCategory");
const { editItem } = require("../controller/admin-product/editItem");
const { deleteItem } = require("../controller/admin-product/deleteItem");
const { getProducts } = require("../controller/admin-product/getProducts");
const adminProductRouter = express.Router();

adminProductRouter.get(
    "/get-products",
    verifyJWT,
    verifyAdmin,
    adminGetCategory
);

adminProductRouter.post(
    "/add-category",
    verifyJWT,
    verifyAdmin,
    addCategory
);

adminProductRouter.put('/edit-category', verifyJWT, verifyAdmin, updateCategory);

adminProductRouter.post("/add-product", verifyJWT, verifyAdmin, addProduct);
adminProductRouter.get("/all-product", verifyJWT, verifyAdmin, allProduct);
adminProductRouter.delete("/delete-category", verifyJWT, verifyAdmin,deleteCategory)
adminProductRouter.post("/edit-item", verifyJWT, verifyAdmin, editItem);
adminProductRouter.delete('/delete-item', verifyJWT, verifyAdmin, deleteItem);
adminProductRouter.post("/get-products", verifyJWT, verifyAdmin, getProducts)

module.exports = { adminProductRouter };
