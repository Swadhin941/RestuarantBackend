const { AllFeedbacks, AllItem, AllCart } = require("../../models/modelDb");

const avgProductRatingNoUser = (allProducts, allFeedbacks) => {
    let popular = [];
    allProducts.forEach((product) => {
        const correspondingFeedback = allFeedbacks.filter(
            (data) => data.productId === product._id.toString()
        );
        const avgRating =
            correspondingFeedback.reduce(
                (sum, item) => sum + item.ratingValue,
                0
            ) / correspondingFeedback.length || 0;
        const totalRatings = correspondingFeedback.length;
        popular.push({
            title: product.title,
            _id: product._id,
            imgLink: product.imgLink,
            ratingValue: avgRating,
            totalRatings,
            price: product.price,
        });
    });
    popular.sort((a, b) => b.ratingValue - a.ratingValue);
    return popular;
};
const avgProductRatingUser = (allProducts, allFeedbacks, userCart) => {
    let popular = [];
    allProducts.forEach((product) => {
        const correspondingFeedback = allFeedbacks.filter(
            (data) => data.productId === product._id.toString()
        );
        const avgRating =
            correspondingFeedback.reduce(
                (sum, item) => sum + item.ratingValue,
                0
            ) / correspondingFeedback.length || 0;
        const totalRatings = correspondingFeedback.length;

        const findCart = userCart.find(
            (CartStatus) => CartStatus.productId === product._id.toString()
        );

        popular.push({
            title: product.title,
            _id: product._id,
            imgLink: product.imgLink,
            ratingValue: avgRating,
            totalRatings,
            price: product.price,
            cartStatus: findCart? true: false
        });
    });
    popular.sort((a, b) => b.ratingValue - a.ratingValue);
    return popular;
};

const specificProductRating = async (req, res) => {
    try {
        const allFeedback = await AllFeedbacks.find({
            productId: req.body.productId,
        }).toArray();
        let totalRating = 0;
        allFeedback.forEach((element) => {
            totalRating += element.ratingValue;
        });
        return res
            .status(200)
            .send({
                avgRating: totalRating / allFeedback.length,
                totalUsersRating: allFeedback.length,
            });
    } catch (error) {
        return res.status(500).send({ message: "Something went wrong!" });
    }
};

const topFewProducts = async (req, res) => {
    try {
        let userCart;
        if (req.query.user !== undefined) {
            userCart = await AllCart.find({ user: req.query.user }).toArray();
        }
        const allProducts = await AllItem.find({}).toArray();
        const allFeedback = await AllFeedbacks.find({}).toArray();
        const popular =
            req.query.user === undefined
                ? avgProductRatingNoUser(allProducts, allFeedback)
                : avgProductRatingUser(allProducts, allFeedback, userCart);
        if (popular.length !== 0) {
            return res.status(200).send(popular);
        }
    } catch (error) {
        return res.status(500).send({ message: "Something went wrong!" });
    }
};

module.exports = { specificProductRating, topFewProducts };
