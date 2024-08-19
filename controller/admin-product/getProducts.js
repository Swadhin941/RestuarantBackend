const { AllItem } = require("../../models/modelDb");


const getProducts = async (req, res) => {
    try {
        const categoryName = req.body.category;
        const products = await AllItem.find({category: categoryName}).toArray();
        return res.status(200).send(products);

    } catch (error) {
        return res.status(500).send({ message: "Something went wrong" });
    }
};

module.exports = { getProducts };
