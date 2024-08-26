const verifyForbidden = async (req, res, next) => {
    if(req.decoded.email!== req.query.user){
        return res.status(403).send({message: "Forbidden Access"});
    }
    next();
};

module.exports = { verifyForbidden };
