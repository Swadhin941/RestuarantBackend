const { ObjectId } = require("mongodb");

const {
    store_id,
    store_pass,
    is_live,
    SSLCommerzPayment,
} = require("../../config/config");
const { AllPayments, AllCart } = require("../../models/modelDb");

const initPayment = async (req, res) => {
    try {
        console.log(req.body);
        const trxID = new ObjectId().toString();
        const data = {
            total_amount: req.body.totalAmount,
            currency: "BDT",
            tran_id: trxID, // use unique tran_id for each api call
            success_url: `http://localhost:4000/api/payment/success/${trxID}`,
            fail_url: `http://localhost:4000/api/payment/error/${trxID}`,
            cancel_url: `http://localhost:4000/api/payment/error/${trxID}`,
            ipn_url: "http://localhost:3030/ipn",
            shipping_method: "Self",
            product_name: "Food",
            product_category: "Food",
            product_profile: "general",
            cus_name: `test name`,
            cus_email: `${req.query.user}`,
            cus_add1: "Dhaka",
            cus_add2: "Dhaka",
            cus_city: "Dhaka",
            cus_state: "Dhaka",
            cus_postcode: "1000",
            cus_country: "Bangladesh",
            cus_phone: "01711111111",
            cus_fax: "01711111111",
            ship_name: "Customer Name",
            ship_add1: "Dhaka",
            ship_add2: "Dhaka",
            ship_city: "Dhaka",
            ship_state: "Dhaka",
            ship_postcode: 1000,
            ship_country: "Bangladesh",
        };
        const sslcz = new SSLCommerzPayment(store_id, store_pass, is_live);
        sslcz.init(data).then(async (apiResponse) => {
            let GatewayPageURL = apiResponse.GatewayPageURL;
            const orderPost = await AllPayments.insertOne({
                ...req.body,
                paid: false,
                trxID: trxID,
                deliverStatus: false,
            });
            return res.send({ url: GatewayPageURL });
        });
    } catch (error) {
        return res.status(500).send({ message: "Something went wrong!" });
    }
};

const successPayment = async (req, res) => {
    try {
        console.log(req.params.trxID);
        const trxID = req.params.trxID;
        const findData = await AllPayments.findOne({ trxID: trxID });
        if (findData) {
            const filter = { trxID: trxID };
            const updateDoc = {
                $set: {
                    paid: true,
                },
            };
            const option = { upsert: false };
            const orderUpdate = await AllPayments.updateOne(
                filter,
                updateDoc,
                option
            );
            const cartUpdate = await AllCart.deleteMany({
                user: findData?.user,
            });
            return res.redirect(`http://localhost:3000/my-profile`);
        } else {
            return res.redirect(`http://localhost:3000/cart`);
        }
    } catch (error) {
        return res.status(500).send({ message: "Something went wrong!" });
    }
};

const failPayment = async (req, res) => {
    try {
    } catch (error) {
        return res.status(500).send({ message: "Something went wrong!" });
    }
};

module.exports = { initPayment, successPayment, failPayment };
