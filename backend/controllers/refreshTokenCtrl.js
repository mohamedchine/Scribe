const userMdl = require("../models/userModel");
const {verifyjwt,genjwt} = require("../utils/jwtUtils");
const asyncHandler = require('express-async-handler');
const refreshTokenCtrl =async(req,res)=>{
    const refreshtoken = req.cookies?.refreshT ;
    //look for refreshtoken
    if(!refreshtoken) return res.status(401).json({message:"unauthorized"});
        // check if the jwt valid 
         const id =  verifyjwt(refreshtoken,process.env.refreshTokenKey) ; 
         
         if(!id){
             return res.status(401).json({message:"unauthorized"});
         }
         //if yes look if theres a user with that reftoken and if his id is equal to that id (bcs : u can get two same refresh token from different payload hash )
           const user = await userMdl.findOne({refreshtoken:refreshtoken});
           if(!user || !user._id.equals(id)){
            return res.status (401).json({message:"unauthorized"}) ;
           }








           //give the user his new access token
           const accessToken = genjwt({id:user._id , isAdmin:user.isAdmin},'15m',process.env.accessTokenkey);
           res.cookie('accessT', accessToken, {
            httpOnly: true, 
            secure: process.env.node_env == 'production', 
            sameSite: 'strict', 
            maxAge: 15 * 60 * 1000 // 15 minutes
        });
        res.status(200).json({message:"refresh token has been given"});
}
module.exports= refreshTokenCtrl ;