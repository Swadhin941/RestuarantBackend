const { AllItem } = require("../../models/modelDb");

const getProductList= async(req, res)=>{
    try{
        const categoryName = req.body.category;
        let products = await AllItem.find({
            category: categoryName,
        }).toArray();
        
        return res.status(200).send(products);
    }
    catch(error){
        return res.status(500).send({message: "Something went wrong!"});
    }
}

const recentProducts= async(req, res)=>{
    try{
        const getProducts= await AllItem.find({}).sort({postSec: -1}).limit(2).toArray();
        return res.status(200).send(getProducts);
    }
    catch(error){
        return res.status(500).send({message: "Something went wrong!"});
    }
}
module.exports= {getProductList, recentProducts}