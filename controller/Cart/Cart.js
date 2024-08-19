const { ObjectId } = require("mongodb");
const { AllCart } = require("../../models/modelDb");

const cart = async (req, res) => {
    try {
        const result = await AllCart.insertOne({ ...req.body });
        const getId = await AllCart.findOne({$and: [{user: req.body.user}, {productId: req.body.productId}]});
        return res.status(200).send({cartId: getId._id});
    } catch (error) {
        return res.status(500).send({ message: "Something went wrong!" });
    }
};

const cartCheck = async (req, res) => {
    try {
        if (!req.body._id) {
            return res.status(200).send({ status: false });
        }
        const result = await AllCart.findOne({
            $and: [{ productId: req.body._id }, { user: req.query.user }],
        });
        if (result) {
            return res.status(200).send({ status: true });
        } else {
            return res.status(200).send({ status: false });
        }
    } catch (error) {
        return res.status(500).send({ message: "Something went wrong!" });
    }
};

const cartRemove = async (req, res) => {
    try {
        const result = await AllCart.deleteOne({
            $and: [{ _id: new ObjectId(req.body.productId) }, { user: req.body.user }],
        });
        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send({ message: "Something went wrong!" });
    }
};

const allCart= async(req, res)=>{
    try{
        const result = await AllCart.find({user: req.query.user}).toArray();
        return res.status(200).send(result);
    }
    catch(error){
        return res.status(500).send({ message: "Something went wrong!" });
    }
}

const productQuantityInc= async(req, res)=>{
    try{
        const filter = {_id: new ObjectId(req.body.cartId)};
        const updatedDoc= {
            $set:{
                quantity: req.body.quantity
            }
        };
        const option = {upsert: true};
        const result = await AllCart.updateOne(filter, updatedDoc, option);
        return res.status(200).send(result);
    }
    catch(error){
        return res.status(500).send({message: "Something went wrong!"});
    }
}

const productQuantityDec= async(req, res)=>{
    try{
        const filter = {_id: new ObjectId(req.body.cartId)};
        const updatedDoc = {
            $set: {
                quantity:req.body.quantity,
            }
        }
        const option = {upsert: true};
        const result = await AllCart.updateOne(filter, updatedDoc, option);
        return res.status(200).send(result);
    }
    catch(error){
        return res.status(500).send({message: "Something went wrong!"});
    }
}

const specificCategoryCartCheck = async(req, res)=>{
    try{    
        const {category}= req.body;
        const result = await AllCart.find({$and: [{category: category}, {user: req.query.user}]}).toArray();
        return res.status(200).send(result);

    }
    catch(error){
        return res.status(500).send({message: "Something went wrong!"});
    }
}



module.exports = { cart, cartCheck, cartRemove, allCart, productQuantityInc, productQuantityDec, specificCategoryCartCheck};
