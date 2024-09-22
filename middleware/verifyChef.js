const verifyChef = (req, res, next) => {
    if (req.decoded.role === "admin" || req.decoded.role === "chef") {
        next();
    } else {
        return res.status(401).send({ message: "Unauthorized Access" });
    }
};
module.exports = { verifyChef };
