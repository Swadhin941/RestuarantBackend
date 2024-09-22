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
module.exports= {getProductList}