const { AllCategories } = require("../../models/modelDb");

const getCategory = async (req, res) => {
    try {
        const result = await AllCategories.find({}).toArray();
        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send({ message: "Something went wrong" });
    }
};

module.exports = { getCategory };
