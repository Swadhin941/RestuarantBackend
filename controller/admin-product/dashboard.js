const { AllFeedbacks, AllPayments } = require("../../models/modelDb");

const displayProductPurchase = async (req, res) => {
    try {
        const allPurchases = await AllPayments.find({paid: true}).toArray();
        let allData = [];
        allPurchases.forEach((element, indexRoot)=>{
            element.allItem.forEach((item, index)=>{
                const findIndex= allData.findIndex((data)=>data.name===item.title);
                if(findIndex>=0){
                    allData[findIndex].quantity= allData[findIndex].quantity+item.quantity;
                    allData[findIndex].totalPrice= allData[findIndex].totalPrice+item.price;
                }
                else{
                    allData.push({
                        name: item.title,
                        productId: item.productId,
                        quantity: item.quantity,
                        totalPrice: item.price,
                    });
                }
            })
        })
        return res.status(201).send(allData);
    } catch (error) {
        return res.status(500).send({ message: "Something went wrong!" });
    }
};

const monthlyRevenue = async (req, res) => {
    try {
        const allPayments= await AllPayments.find({dateString: {$regex: new RegExp(req.body.year)}}).toArray();
        let tempArray= [];
        let tempArray2= [];
        allPayments.forEach((element)=>{
            const findIndex= tempArray.findIndex((data)=>data.month=== element.currentMonth);
            if(findIndex>=0){
                tempArray[findIndex].revenue+= element.totalAmount;
            }
            else{
                tempArray.push({
                    month: element.currentMonth,
                    revenue: element.totalAmount,
                });
            }
            const findIndex2= tempArray2.findIndex((data)=>data.user=== element.user);
            if(findIndex2>=0){
                tempArray2[findIndex2].revenue+= element.totalAmount;
            }
            else{
                tempArray2.push({
                    user: element.user,
                    revenue: element.totalAmount,
                });
            }
        })
        return res.status(200).send({data: tempArray, data2: tempArray2});
    } catch (error) {
        return res.status(500).send({ message: "Something went wrong!" });
    }
};

module.exports = { displayProductPurchase, monthlyRevenue };
