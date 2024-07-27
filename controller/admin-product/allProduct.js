const { AllCategories } = require("../../models/modelDb");

const allProduct=async(req, res)=>{
    try{
        const result = await AllCategories.aggregate([
            {
                $lookup: {
                    from: "Item",
                    localField: "name",
                    foreignField: "category",
                    as: "allProductList",
                }
            }
        ]).toArray();
        return res.status(200).send(result);
    }
    catch(error){
        return res.status(500).send({message: "Something went wrong!"});
    }
}

module.exports= {allProduct};