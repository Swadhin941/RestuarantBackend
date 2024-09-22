const { AllPayments, AllFeedbacks, Users } = require("../../models/modelDb");
const fetchUserDetails = require("./fetchUserDetails");

const productUserCheck = async (req, res) => {
    try {
        const result = await AllPayments.find({
            $and: [{ user: req.query.user }, { deliverStatus: true }],
        }).toArray();
        let count = 0;
        if (result.length > 0) {
            result.forEach((element) => {
                if (count == 1) {
                    return;
                }
                const findData = element.allItem.find(
                    (data) => data.productId === req.body.productId
                );
                if (findData) {
                    count += 1;
                }
            });
            if (count > 0) {
                return res.status(200).send({ purchase: true });
            }
        } else {
            return res.status(200).send({ purchase: false });
        }
    } catch (error) {
        return res.status(500).send({ message: "Something went wrong!" });
    }
};

const feedbackPost = async (req, res) => {
    try {
        const result = await AllFeedbacks.insertOne({ ...req.body });
        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send({ message: "Something went wrong!" });
    }
};

const getAllFeedback = async (req, res) => {
    try {
        // console.log(req.query.productId);
        let result = await AllFeedbacks.find({
            productId: req.query.productId,
        })
            .sort({ timeInMIll: -1 })
            .toArray();
        result.forEach(async (feedbackData, index) => {
            const findUser = await fetchUserDetails(feedbackData.email);
            result[index].imgLink = findUser?.imgLink;
        });
        setTimeout(()=>{
            return res.status(200).send(result);
        },3000)
        
    } catch (error) {
        return res.status(500).send({ message: "Something went wrong!" });
    }
};

module.exports = { productUserCheck, feedbackPost, getAllFeedback };
