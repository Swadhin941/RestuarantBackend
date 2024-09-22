const { AllFeedbacks, AllItem } = require("../../models/modelDb");

const specificProductRating = async (req, res) => {
    try {
        const allFeedback = await AllFeedbacks.find({productId: req.body.productId}).toArray();
        let totalRating = 0;
        allFeedback.forEach((element)=>{
            totalRating+=element.ratingValue;
        })
        return res.status(200).send({avgRating: totalRating/allFeedback.length, totalUsersRating: allFeedback.length});

    } catch (error) {
        return res.status(500).send({ message: "Something went wrong!" });
    }
};

const topFewProducts= async(req, res)=>{
    try{
        const allProducts = await AllItem.find({}).toArray();
        const allFeedback = await AllFeedbacks.find({}).toArray();
        let popular= [];
        allProducts.forEach((product)=>{
            const correspondingFeedback= allFeedback.filter((data)=>data.productId=== product._id.toString());
            const avgRating=correspondingFeedback.reduce((sum, item)=>sum+item.ratingValue, 0)/correspondingFeedback.length || 0;
            const totalRatings= correspondingFeedback.length;
            popular.push({title: product.title,_id: product._id, imgLink: product.imgLink,ratingValue: avgRating, totalRatings});
        });
        popular.sort((a, b)=>b.ratingValue-a.ratingValue);
        if(popular.length!==0){
            return res.status(200).send(popular);
        }
        
    }
    catch(error){
        return res.status(500).send({ message: "Something went wrong!" });
    }
};

module.exports = { specificProductRating, topFewProducts };
