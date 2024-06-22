const { jwt } = require("../../config/config");

const jsonwebtoken = async (req, res) => {
    const token = await jwt.sign(
        { email: req.body.email, role: req.body.role },
        process.env.ACCESS_TOKEN,
        { expiresIn: "1h" }
    );
    res.send({ token: token });
};

module.exports = { jsonwebtoken };
