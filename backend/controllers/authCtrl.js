const {validateUserInputLR} = require("../utils/validationutils") ; 
const userMdl = require("../models/userModel");
const {hashPassword , comparePasswords} = require("../utils/hashingUtils") ; 
const {genjwt} = require('../utils/jwtUtils');
const asyncHandler = require('express-async-handler');
const registerctrl = async(req,res)=>{
    
    const {error,value} =  validateUserInputLR(req.body,true) ;   
     if(error){
        return  res.status(400).json(error.details[0].message) ; 
     }
     const exist  = await userMdl.findOne({email:req.body.email}) ; 
     if (exist){
        return res.status(400).json({error : "sorry user already exists"})
     }
     const hashedpassword = await hashPassword(value.password) ;
     await userMdl.create({name : value.name ,lastname  : value.lastname , email : req.body.email ,password : hashedpassword }) ; //value contain the name after the triming in the validationutils
     res.status(201).json({message : "registered successfully "});
}
const loginctrl = async(req,res)=>{

    try{ const {error}  = validateUserInputLR(req.body ,false) ; 
     if(error){
     return  res.status(400).json({message : error.details[0].message});
     }
     //look for the user email in the db
     const user = await userMdl.findOne({ email :req.body.email}) ; 
     if(!user){
      return res.status(400).json({message : "invalid email or password"});
     }
     //compare passwords
     const passwordmatch = await comparePasswords(req.body.password , user.password) ; 
     if (!passwordmatch){
      return res.status(400).json({message : "invalid email or password"});
     }
    //we would create for him the access and the refresh token
    const refreshToken=genjwt({id:user._id},'7d');
    const accessToken = genjwt({id:user._id , isAdmin:user.isAdmin},'15m');


    //save the refresh token in the db in case we want to invalidate it in the future
    user.refreshtoken=refreshToken;
    await user.save(); 
   
    res.cookie('accessT', accessToken, {
      httpOnly: true, 
      secure: process.env.node_env == 'production', 
      sameSite: 'strict', 
      maxAge: 15 * 60 * 1000 // 15 minutes
  });
  
  res.cookie('refreshT', refreshToken, {
      httpOnly: true, 
      secure: process.env.node_env == 'production', 
            sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
  
    res.status(200).json({message : "logged in succefully"});}
    catch(e){
        res.status(404).json(e , "internal server error")
    }
}
module.exports = {registerctrl ,loginctrl} ; 