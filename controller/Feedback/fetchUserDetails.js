const { Users } = require("../../models/modelDb");

const fetchUserDetails= async(email)=>{
    try{
        const getUser= await Users.findOne({email: email});
        return getUser;
    }
    catch(error){
        return null;
    }
}
module.exports= fetchUserDetails;