import { AllCategories } from "../../models/modelDb";

const addCategory = async (req, res) => {
    try {
        const data = req.body;
        const result = await AllCategories.insertOne(data);
        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send({ message: "Something went wrong" });
    }
};

module.exports = { addCategory };
