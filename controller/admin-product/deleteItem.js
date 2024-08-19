const { ObjectId } = require("mongodb");
const { AllItem } = require("../../models/modelDb");

const deleteItem= async(req, res)=>{
    try{
        const result = await AllItem.deleteOne({_id: new ObjectId(req.body.id)})
        return res.status(200).send(result);
    }
    catch(error){
        return res.status(500).send({message: "Something went wrong!"})
    }
}
module.exports= {deleteItem};