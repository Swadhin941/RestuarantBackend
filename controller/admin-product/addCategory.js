const { AllCategories } = require("../../models/modelDb");

const addCategory = async (req, res) => {
    console.log(req.body);
    try {
        const result = await AllCategories.insertOne({ ...req.body });
        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send({ message: "Something went wrong" });
    }
};

module.exports = { addCategory };
