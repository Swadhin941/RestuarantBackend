const express = require("express");
const { login } = require("../controller/user/login");
const { register } = require("../controller/user/register");
const { jsonwebtoken } = require("../controller/user/jwt");
const { verifyJWT } = require("../middleware/verifyJWT");
const { SubscriberCheck } = require("../controller/user/SubscriberCheck");
const { verifyAdmin } = require("../middleware/verifyAdmin");
const { verifyForbidden } = require("../middleware/verifyForbidden");
const {
    allUsers,
    updateUser,
    roleUpdate,
    deleteUser,
} = require("../controller/user/allUsers");
const userRouter = express.Router();
userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.post("/jwt", jsonwebtoken);
userRouter.post("/SubscriberCheck", verifyJWT, SubscriberCheck);
userRouter.get("/all-users", verifyJWT, verifyAdmin, verifyForbidden, allUsers);
userRouter.put("/update-user", verifyJWT, verifyForbidden, updateUser);
userRouter.put(
    "/update-role",
    verifyJWT,
    verifyAdmin,
    verifyForbidden,
    roleUpdate
);
userRouter.delete(
    "/delete-user",
    verifyJWT,
    verifyAdmin,
    verifyForbidden,
    deleteUser,
);

module.exports = { userRouter };
