const { jwt } = require("../config/config");


const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: "Unauthorized Access" });
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, (error, decoded) => {
        if (error) {
            return res.status(401).send({ message: "Unauthorized Access" });
        }
        req.decoded = decoded;
        next();
    });
};
module.exports = { verifyJWT };
