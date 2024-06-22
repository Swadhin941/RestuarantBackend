const { Users } = require("../../models/modelDb");

const login = async (req, res) => {
    try {
        const findUser = await Users.findOne({
            $and: [{ email: req.body.email }, { password: req.body.password }],
        });
        if (findUser) {
            return res.status(200).send(findUser);
        } else {
            return res
                .status(401)
                .send({ message: "Invalid username or password" });
        }
    } catch (error) {
        return res.status(500).send({ message: "Something went wrong" });
    }
};
module.exports = { login };
