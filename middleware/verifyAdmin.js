const verifyAdmin = (req, res, next) => {
    if (req.decoded.role !== "admin") {
        return res.status(403).send({ message: "Unauthorized Access" });
    }
    next();
};
module.exports = { verifyAdmin };
