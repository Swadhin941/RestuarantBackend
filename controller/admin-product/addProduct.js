const { AllItem } = require("../../models/modelDb")

const addProduct = async(req, res)=>{
    try{
        const result = await AllItem.insertOne({...req.body})
        return res.status(200).send(result)
    }
    catch(error){
        return res.status(500).send({message: "Something went wrong"})
    }
}

module.exports = {addProduct}