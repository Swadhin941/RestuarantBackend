const verifyAdmin = (req, res, next) => {
    if (req.decoded.role !== "admin") {
        return res.status(401).send({ message: "Unauthorized Access" });
    }
    next();
};
module.exports = { verifyAdmin };
