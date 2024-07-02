
const { ObjectId } = require("../../config/config");
const { AllCategories } = require("../../models/modelDb");

const updateCategory= async(req, res)=>{
    try{
        const filter = {_id: new ObjectId(req.body._id)};
        const updatedDoc= {
            $set: {
                name: req.body.name,
                imgLink: req.body.imgLink
            }
        };
        const option = {upsert: true};
        const result = await AllCategories.updateOne(filter, updatedDoc, option);
        console.log(result);
        return res.status(200).send(result);
    }
    catch(error){
        return res.status(500).send({ message: "Something went wrong" });
    }
}

module.exports= {updateCategory};