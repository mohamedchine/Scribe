const {validateUserInputLR} = require("../utils/uservalidationUtils") ; 
const userMdl = require("../models/userModel");
const {hashPassword , comparePasswords} = require("../utils/hashingUtils") ; 
const {genjwt, verifyjwt} = require('../utils/jwtUtils');
const sendEmail = require('../utils/mailUtils');
const asyncHandler = require('express-async-handler');



const registerctrl = asyncHandler(async(req,res)=>{
    const {error,value} =  validateUserInputLR(req.body,true) ;   
     if(error){
        return  res.status(400).json({message : error.details[0].message}) ; 

     }
     const exist  = await userMdl.findOne({email:req.body.email}) ; 
     if (exist){
        return res.status(400).json({message : "user already exists"})
     }
     const hashedpassword = await hashPassword(value.password) ;
     const user = await userMdl.create({name : value.name ,lastname  : value.lastname , email : req.body.email ,password : hashedpassword }) ; //value contain the name after the triming in the validationutils
 

    const verificationToken = genjwt({id:user._id},'1h',process.env.verificationTokenKey);
    
     const link = `${process.env.CLIENT_DOMAIN}/users/${user._id}/verify/${verificationToken}`;

     const htmlTemplate = `
       <div>
         <p>Click on the link below to verify your account</p>
         <a href="${link}">Verify</a>
       </div>`;


    await sendEmail(user.email, "Verify Your Email", htmlTemplate);
     
     res.status(201).json({
       message: "we've emailed you a link please click it to verify your account",
     });
     
})





const loginctrl = asyncHandler(async(req,res)=>{
    try{ const {error}  = validateUserInputLR(req.body ,false) ; 
     if(error){
     return  res.status(400).json({message : "wrong email or password , "+req.stillhavemessage});
     }
     //look for the user email in the db
     const user = await userMdl.findOne({ email :req.body.email}) ; 
     if(!user){
      return res.status(400).json({message : "invalid email or password , "+req.stillhavemessage});
     }
     //compare passwords
     const passwordmatch = await comparePasswords(req.body.password , user.password) ; 
    
     if (!passwordmatch){
      return res.status(400).json({message : "invalid email or password , "+req.stillhavemessage});
     }
    //check if he's verified
    if(!user.isAccountVerified){
      const verificationToken = genjwt({id:user._id},'1h',process.env.verificationTokenKey);
    
      const link = `${process.env.CLIENT_DOMAIN}/users/${user._id}/verify/${verificationToken}`;
 
      const htmlTemplate = `
        <div>
          <p>Click on the link below to verify your email</p>
          <a href="${link}">Verify</a>
        </div>`;
 
 
     await sendEmail(user.email, "Verify Your Email", htmlTemplate);
      return res.status(403).json({message:"your not verified yet we've sent you a verification link to ur gmail please click it to be able to login "});

    }
     //we would create for him the access and the refresh token
    // const refreshToken=genjwt({id:user._id},'7d',process.env.refreshTokenKey);
    const accessToken = genjwt({id:user._id , isAdmin:user.isAdmin},'7d',process.env.accessTokenkey);


    //save the refresh token in the db in case we want to invalidate it in the future
    // user.refreshtoken=refreshToken;
    await user.save(); 
   
    res.cookie('accessT', accessToken, {
      httpOnly: true, 
      secure: process.env.node_env == 'production', 
      sameSite: 'strict', 
      maxAge: 7*24 * 60 * 1000*60
  });
  
//   res.cookie('refreshT', refreshToken, {
//       httpOnly: true, 
//       secure: process.env.node_env == 'production', 
//             sameSite: 'strict',
//       maxAge: 7 * 24 * 60 * 60 * 1000
//   });
  
    res.status(200).json({_id : user._id , isAdmin : user.isAdmin , profilePic:user.profilePic , fullname :user.name +" "+user.lastname});}
    catch(e){
        res.status(404).json(e , "internal server error")
    }
})


//when first oppening the app to get the user info  from the httponly access token (needs a rate limiter)
const checkAuthctrl  = asyncHandler(async(req,res)=>{
    if (!req.cookies?.accessT) return res.status(401).json({message:"unauthenticated"});
        const id = verifyjwt(req.cookies.accessT, process.env.accessTokenkey); 
        if (!id) return res.status(401);  
        const user = await userMdl.findById(id); 
        if (!user)return res.status(401); 
        res.status(200).json({_id : user._id , isAdmin : user.isAdmin , profilePic:user.profilePic , fullname :user.name +" "+user.lastname});
});



const logoutctrl = asyncHandler((req, res) => {
  res.clearCookie('accessT', {
    httpOnly: true,
    secure: process.env.node_env === 'production',
    sameSite: 'strict',
  });
  res.status(200).json({ message: 'Logged out ' });
});


const verifyEmailCtrl = asyncHandler(async(req,res)=>{
  const user = await userMdl.findById(req.params.userId);
  if (!user) {
    return res.status(400).json({ message: "invalid link" });
  }
  if(user.isAccountVerified) {
    return res.status(400).json({ message: "Your account is already verified" });
  }
  const id = verifyjwt(req.params.token, process.env.verificationTokenKey);
  if (!id || id !== user._id.toString()) {
    return res.status(400).json({ message: "invalid link" });
  }
  user.isAccountVerified = true;
  await user.save();
  res.status(200).json({ message: "Your account is verified" });
})

module.exports = {registerctrl ,loginctrl,checkAuthctrl,logoutctrl ,verifyEmailCtrl} ; 