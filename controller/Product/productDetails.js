const { ObjectId } = require("mongodb");
const { AllItem, AllFeedbacks } = require("../../models/modelDb");

const productDetails= async(req, res)=>{
    try{
        const result = await AllItem.findOne({_id: new ObjectId(req.params.id)});
        return res.status(200).send(result);
    }   
    catch(error){
        return res.status(500).send({message: "Something went wrong!"});
    }
}

const productNameForSearch= async(req, res)=>{
    try{
        const result = await AllItem.find({}).project({title:1}).toArray();
        return res.status(201).send(result);
    }
    catch(error){
        return res.status(500).send({message: "Something went wrong!"});
    }
}

module.exports= {productDetails, productNameForSearch};