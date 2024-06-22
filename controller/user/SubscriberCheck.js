const { Users } = require("../../models/modelDb");

const SubscriberCheck = async (req, res) => {
    console.log(req.decoded);
    try {
        const findUser = await Users.findOne({
            $and: [{ email: req.decoded.email }, { role: req.decoded.role }],
        });
        if (findUser) {
            return res.status(200).send({ user: findUser });
        } else {
            return res.status(401).send({ message: "User not found" });
        }
    } catch (error) {
        return res.status(500).send({ message: "Something went wrong" });
    }
};

module.exports = { SubscriberCheck };
