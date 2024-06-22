const { Users } = require("../../models/modelDb");

const register = async (req, res) => {
    try {
        const findUser = await Users.findOne({ email: req.body.email });
        if (findUser) {
            return res.status(401).send({ message: "User already exists" });
        }
        const newUser = await Users.insertOne({ ...req.body, role: "regular" });
        return res.status(200).send(newUser);
    } catch (error) {
        return res.status(500).send({ message: "Something went wrong" });
    }
};
module.exports = { register };
