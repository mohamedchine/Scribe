const userMdl = require('../models/userModel');
const {validateUpdateUser} = require('../utils/uservalidationUtils');
const asyncHandler = require('express-async-handler');
const {comparePasswords,hashPassword} = require('../utils/hashingUtils');
const {removeImageFCloudinary,removeImagesFCloudinary} = require('../utils/cloudinary');
const postMdl = require('../models/postModel');
const commentMdl = require('../models/commentModel');

const getAllUsersCtrl = asyncHandler(async(req,res)=>{
     const users = await userMdl.find().select("-refreshtoken -password").populate("posts"); 
     res.status(200).json(users);
}


)
const getUserProfileCtrl = asyncHandler(async(req,res)=>{
     const id =req.params.id ;
     const user = await userMdl.findOne({_id :id}).select("-refreshtoken -password").populate("posts");
     if (!user){
         return res.status(400).json({message : 'not found'});
     }
     res.status(200).json(user) ; 
}

)

const updateUserProfileCtrl =asyncHandler( async(req,res)=>{
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
)



const numberOfUsersCtrl = asyncHandler(async(req , res)=>{
    
     const numberOfUsers = await userMdl.countDocuments();
     res.status(200).json(numberOfUsers) ; 
}


)

const uploadProfilePicCtrl =asyncHandler( async(req,res)=>{
     if(!req.file){ 
          return res.status(400).json({error : "no picture received"});
     }
     //removing the old pfp if exists
     if(req.user.profilePic.publicid) {
          await removeImageFCloudinary(req.user.profilePic.publicid);
     }
     //update the pfp in the db
     [req.user.profilePic.url,req.user.profilePic.publicid] = [req.file.path,req.file.filename]; 
     await req.user.save();
     res.status(200).json({message : "pfp uploaded succesfully"});
}

)


const deleteProfileCtrl =asyncHandler(async(req,res)=>{
     //delete him from the db
     const usertodelete = await userMdl.findByIdAndDelete({_id :req.params.id});
     
     
     if(!usertodelete) return res.status(400).json({message: "user not found or already deleted"});
     
     //delete his pfp the cloud 
     if(usertodelete.profilePic.publicid) await removeImageFCloudinary(usertodelete.profilePic.publicid);
     

     //delete his posts pic from cloud 
      const userposts = await postMdl.find({author : usertodelete._id}) ; 
      

         //get array of picpublicids
         var userPostPicsPubids = [] ;
         for(let post of userposts){
          userPostPicsPubids [userPostPicsPubids.length] = post.photo.publicid ; 
         }

         if(userPostPicsPubids.length >0){
          await removeImagesFCloudinary(userPostPicsPubids);
         }



     //delete his posts comments 
     await postMdl.deleteMany({author : usertodelete._id});
     await commentMdl.deleteMany({authorid : usertodelete._id});
     
     //delete his likes at otherposts
     const allposts = await postMdl.find() ;
     for(let post of allposts){
          if(post.likes.includes(usertodelete._id)){
               var newpostlikes =[];
               for(let id of post.likes){
                    if(!id.equals(usertodelete._id)){
                         newpostlikes[newpostlikes.length] = id
                    }
               }
               post.likes = newpostlikes ;
          }
          post.save();
     }
     //remove his access token in case its his profile 
     if(req.params.id == req.user.id)    
          res.clearCookie('accessT', {
          httpOnly: true,
          secure: process.env.node_env === 'production',
          sameSite: 'strict'
        });
        
     res.status(200).json({message : "user deleted successfully"})

}
)


module.exports =
{getAllUsersCtrl , getUserProfileCtrl,updateUserProfileCtrl,numberOfUsersCtrl,uploadProfilePicCtrl,
     deleteProfileCtrl};