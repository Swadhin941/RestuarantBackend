const express = require("express");
const {
    productUserCheck,
    feedbackPost,
    getAllFeedback,
} = require("../controller/Feedback/Feedback");
const { verifyJWT } = require("../middleware/verifyJWT");
const { verifyForbidden } = require("../middleware/verifyForbidden");
const feedbackRoutes = express.Router();
feedbackRoutes.post("/user-product-check", verifyJWT, verifyForbidden, productUserCheck);
feedbackRoutes.post("/post", verifyJWT, verifyForbidden, feedbackPost);
feedbackRoutes.get("/all",getAllFeedback);

module.exports = { feedbackRoutes };
