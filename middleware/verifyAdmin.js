const verifyAdmin = (req, res, next) => {
    if (req.decoded.role !== "admin") {
        return res.status(403).send({ message: "Unauthorized Access" });
    }
    if (req.query.user !== req.decoded.email) {
        return res.status(403).send({ message: "Forbidden Access" });
    }
    next();
};
module.exports = { verifyAdmin };
