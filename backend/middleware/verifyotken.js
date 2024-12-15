const {verifyjwt} = require('../utils/jwtUtils'); 
const userMdl = require('../models/userModel');


const verifytoken = async (req, res, next) => {
        if (!req.cookies?.accessT) return res.status(401).json({message:"no token"});
        const id = verifyjwt(req.cookies.accessT, process.env.accessTokenkey); 
        if (!id) return res.status(401);  
        const user = await userMdl.findById(id); 
        if (!user) return res.status(401);
        req.user = user;
        next();

};

const verifytokenandadmin=async(req,res,next)=>{
        verifytoken(req,res , ()=>{
                if(!req.user.isAdmin) return res.status(403).json({message : "access denied"});
                next();
        });
}


module.exports = {verifytoken,verifytokenandadmin} ; 