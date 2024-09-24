const { AllFeedbacks, AllPayments } = require("../../models/modelDb");

const displayProductPurchase = async (req, res) => {
    try {
        const allPurchases = await AllPayments.find({}).toArray();
        let allData = [];
        allPurchases.forEach((element) => {
            let temp = [];
            element.allItem.forEach((item) => {
                if (allData.length === 0) {
                    allData.push({
                        name: item.title,
                        productId: item.productId,
                        quantity: item.quantity,
                    });
                } else {
                    temp.push({
                        name: item.title,
                        productId: item.productId,
                        quantity: item.quantity,
                    });
                }
            });
            temp.forEach((tempItem) => {
                allData.forEach((findItem) => {
                    if (findItem.productId === tempItem.productId) {
                        findItem.quantity += tempItem.quantity;
                    } else {
                        allData.push(tempItem);
                    }
                });
            });
        });
        if (allData.length) {
            return res.status(200).send(allData);
        }
    } catch (error) {
        return res.status(500).send({ message: "Something went wrong!" });
    }
};

const monthlyRevenue = async (req, res) => {
    try {
        const allPayments = await AllPayments.find({}).toArray();
        const tempArray = [];
        const tempArray2 = [];
        allPayments.forEach((element) => {
            if (tempArray.length === 0 && tempArray2.length === 0) {
                const dataYear = new Date(element.timeInMill).getFullYear();
                if (dataYear === req.body.year) {
                    tempArray.push({
                        month: element.currentMonth,
                        revenue: element.totalAmount,
                    });
                    tempArray2.push({
                        revenue: element.totalAmount,
                        user: element.user,
                    });
                }
            } else {
                const dataYear = new Date(element.timeInMill).getFullYear();
                if (dataYear === req.body.year) {
                    tempArray.forEach((item) => {
                        if (item.month === element.currentMonth) {
                            item.revenue += element.totalAmount;
                        }
                    });
                    tempArray2.forEach((item) => {
                        if (item.user === element.user) {
                            item.revenue += element.totalAmount;
                        }
                    });
                }
            }
        });
        return res.status(200).send({ data: tempArray, data2: tempArray2 });
    } catch (error) {
        return res.status(500).send({ message: "Something went wrong!" });
    }
};

module.exports = { displayProductPurchase, monthlyRevenue };
