const { ObjectId } = require("mongodb");
const { Users } = require("../../models/modelDb");

const allUsers = async (req, res) => {
    try {
        if (req.query.role === "chef" || req.query.role === "admin") {
            const result = await Users.find({
                $and: [
                    { email: { $ne: req.query.user } },
                    { role: req.query.role },
                ],
            })
                .project({ password: 0 })
                .toArray();
            return res.status(200).send(result);
        } else {
            const result = await Users.find({ email: { $ne: req.query.user } })
                .project({ password: 0 })
                .toArray();
            return res.status(200).send(result);
        }
    } catch (error) {
        return res.status(500).send({ message: "Something went wrong!" });
    }
};

const updateUser = async (req, res) => {
    try {
        const filter = { email: req.query.user };
        const updatedDoc = {
            $set: {
                ...req.body,
            },
        };
        const option = { upsert: true };
        const result = await Users.updateOne(filter, updatedDoc, option);
        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send({ message: "Something went wrong!" });
    }
};

const roleUpdate = async (req, res) => {
    try {
        const filter = { email: req.body.email };
        const updatedDoc = {
            $set: {
                role: req.body.role,
            },
        };
        const option = { upsert: false };
        const result = await Users.updateOne(filter, updatedDoc, option);
        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send({ message: "Something went wrong!" });
    }
};

const deleteUser = async(req, res)=>{
    try{
        const result= await Users.deleteOne({email: req.body.email});
        return res.status(200).send(result);
    }
    catch(error){
        return res.status(500).send({message: "Something went wrong!"});
    }
};

const updateUserByAdmin= async(req, res)=>{
    try{
        console.log(req.body)
        const filter = {_id: new ObjectId(req.body.id)};
        const updatedDoc= {
            $set: {
                fullName: req.body.fullName,
                email: req.body.email
            }
        }
        const option= {upsert: false};
        const result = await Users.updateOne(filter, updatedDoc, option);
        return res.status(200).send(result);
    }
    catch(error){
        return res.status(500).send({message: "Something went wrong!"});
    }
}

module.exports = { allUsers, updateUser, roleUpdate, deleteUser, updateUserByAdmin };
