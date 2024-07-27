const { ObjectId } = require("mongodb");
const { AllCategories, AllItem } = require("../../models/modelDb");

const deleteCategory= async(req, res)=>{
    try{
        const result = await AllCategories.deleteOne({
            name: req.body.name
        });
            const deleteAllData = await AllItem.deleteMany({category: req.body.name});
            return res.status(200).send(result);
    }
    catch(error){
        return res.status(500).send({ message: "Something went wrong!" });
    }
}

module.exports= {deleteCategory}