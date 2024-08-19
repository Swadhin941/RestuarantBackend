const { ObjectId } = require("mongodb");
const { AllItem } = require("../../models/modelDb");

const editItem = async (req, res) => {
    try {
        const filter = { _id: new ObjectId(req.query.id) };
        const updatedDoc = {
            $set: {
                ...req.body,
            },
        };
        const option = { upsert: true };
        const result = await AllItem.updateOne(filter, updatedDoc, option);
        console.log(result);
        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send({ message: "Something went wrong" });
    }
};

module.exports = { editItem };
