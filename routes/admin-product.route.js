const express = require("express");
const { verifyAdmin } = require("../middleware/verifyAdmin");
const { verifyJWT } = require("../middleware/verifyJWT");
const {
    adminGetCategory,
} = require("../controller/admin-product/admin_getCategory");
const { addCategory } = require("../controller/admin-product/addCategory");
const { updateCategory } = require("../controller/admin-product/updateCategory");
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

module.exports = { adminProductRouter };
