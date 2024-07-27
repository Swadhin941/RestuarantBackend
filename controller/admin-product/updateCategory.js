const { ObjectId } = require("../../config/config");
const { AllCategories, AllItem } = require("../../models/modelDb");

const updateCategory = async (req, res) => {
    try {
        const filter = { _id: new ObjectId(req.body._id) };
        const updatedDoc = {
            $set: {
                name: req.body.name,
                imgLink: req.body.imgLink,
            },
        };
        const filter2 = { category: req.body.oldName };
        const updatedDoc2 = {
            $set: {
                category: req.body.name,
            },
        };
        const result2 = await AllItem.updateMany(filter2, updatedDoc2);
        const result = await AllCategories.updateOne(filter, updatedDoc);
        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send({ message: "Something went wrong" });
    }
};

module.exports = { updateCategory };
