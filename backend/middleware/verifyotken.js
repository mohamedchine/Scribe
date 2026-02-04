const {verifyjwt} = require('../utils/jwtUtils'); 
const userMdl = require('../models/userModel');
const postMdl = require('../models/postModel');

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
                if(!req.user.isAdmin) return res.status(403).json({message : "access denied "});
                next();
        });
}
//middleware that take verify if the userid in the token(access) is equal to the userid in the reqparams
const verifytokenandownership = async (req,res,next)=>{ 
        verifytoken(req,res ,()=>{
                if( ! (req.user.id == req.params.id )){
                        return res.status(403).json({message:"u can't update somoene elses profile"}) ; 
                }
                next() ;
        });
}
//for the delete profile only admin or usersthemselves can do it
const verifytokenAndownershiptOradmin = async(req,res,next)=>{
        verifytoken(req,res,()=>{
                if (req.user.id == req.params.id || req.user.isAdmin) return next();
                return res.status(403).json ({message :"u can't delete somoene elses profile"});
        }) ; 
}
const verifytokenAndPostOwnership = async(req,res,next)=>{
        //first we verify post existince
        const post = await postMdl.findOne({ _id : req.params.id}) ;
        if(!post) return res.status(400).json({message : "no post with that id sir"}) ;
      
        //second we verify user authentification
        verifytoken(req,res,()=>{         
                //third we verify authorisation (post ownership)
         if( ! post.author.equals(req.user._id)) return res.status(403).json({message : "u cant update somoene elses post"});
         req.post = post ; 
         //if all good he can update
         next();
        })
}
module.exports = {verifytoken,verifytokenandadmin,verifytokenandownership ,verifytokenAndownershiptOradmin,verifytokenAndPostOwnership} ; 