const productCart = async(req, res)=>{
    try{
        console.log(req.body);
    }
    catch(error){
        return res.status(500).send({message: "Something went wrong!"});
    }
}
module.exports= {productCart};