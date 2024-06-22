const express = require("express");
const { login } = require("../controller/user/login");
const { register } = require("../controller/user/register");
const { jsonwebtoken } = require("../controller/user/jwt");
const { verifyJWT } = require("../middleware/verifyJWT");
const { SubscriberCheck } = require("../controller/user/SubscriberCheck");
const userRouter = express.Router();
userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.post("/jwt", jsonwebtoken);
userRouter.post("/SubscriberCheck", verifyJWT, SubscriberCheck);

module.exports = { userRouter };
