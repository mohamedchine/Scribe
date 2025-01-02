const userMdl = require('../models/userModel');
const {validateUpdateUser} = require('../utils/validationutils');
const asyncHandler = require('express-async-handler');
const {comparePasswords,hashPassword} = require('../utils/hashingUtils');
const removeImageFCloudinary = require('../utils/cloudinary');

const getAllUsersCtrl = async(req,res)=>{
     const users = await userMdl.find().select("-refreshtoken -password"); 
     res.status(200).json(users);
}



const getUserProfileCtrl = async(req,res)=>{
     const id =req.params.id ;
     const user = await userMdl.findOne({_id :id}).select("-refreshtoken -password");
     if (!user){
         return res.status(400).json({message : 'not found'});
     }
     res.status(200).json(user) ; 
}



const updateUserProfileCtrl = async(req,res)=>{
     const {error ,value} = validateUpdateUser(req.body) ;
     if(error){
          return res.status(400).json({message : error.details[0].message});
     }
     if(req.body.newpassword ){
          
          if(!req.body.oldpassword) return res.status(403).json({message : "old password is required"}) ; 
          

          const match = await comparePasswords(value.oldpassword , req.user.password);
          if(!match) return res.status(403).json({message : "verify your old password sir"});


          req.body.newpassword = await hashPassword(value.newpassword);
     }

     const updatedUser = await userMdl.findByIdAndUpdate(req.user.id ,{
               name : value.name ,
               lastname : value.lastname , 
               password : req.body.password , 
               bio : value.bio  
     },{new:"true"}).select("-password -refreshtoken");
     res.status(200).json({message: "user have been updated successfuly", updatedUser});
}




const numberOfUsersCtrl = async(req , res)=>{
     const numberOfUsers = await userMdl.countDocuments();
     res.status(200).json(numberOfUsers) ; 
}




const uploadProfilePicCtrl = async(req,res)=>{
     if(!req.file){ 
          return res.status(400).json({error : "no picture received"});
     }
     //removing the old pfp if exists
     if(req.user.profilePic.publicid) {
          removeImageFCloudinary(req.user.profilePic.publicid);
     }
     //update the pfp in the db
     [req.user.profilePic.url,req.user.profilePic.publicid] = [req.file.path,req.file.filename]; 
     await req.user.save();
     res.status(200).json({message : "pfp uploaded succesfully"});
}




const deleteProfileCtrl =async(req,res)=>{
     const usertodelete = await userMdl.findByIdAndDelete({_id :req.params.id});
     
     //delete it from the db
     if(!usertodelete) return res.status(400).json({message: "user not found or already deleted"});
     
     //delete it from the cloud 
     if(usertodelete.profilePic.publicid) removeImageFCloudinary(usertodelete.profilePic.publicid);
     
     res.status(200).json({message : "user deleted successfully"})

}



module.exports =
{getAllUsersCtrl , getUserProfileCtrl,updateUserProfileCtrl,numberOfUsersCtrl,uploadProfilePicCtrl,
     deleteProfileCtrl};