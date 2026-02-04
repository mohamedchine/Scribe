const userMdl = require('../models/userModel');
const {validateUpdateUser} = require('../utils/uservalidationUtils');
const asyncHandler = require('express-async-handler');
const {comparePasswords,hashPassword} = require('../utils/hashingUtils');
const {removeImageFCloudinary,removeImagesFCloudinary} = require('../utils/cloudinary');
const postMdl = require('../models/postModel');
const commentMdl = require('../models/commentModel');

const getAllUsersCtrl = asyncHandler(async(req,res)=>{
     const users = await userMdl.find({ _id: { $ne: req.user.id } }).select("-refreshtoken -password").populate("posts"); //exclude the current user from the list
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
    
     
     if(value.password){
      req.body.password = await hashPassword(value.password);
      
     }
     
     const updatedUser = await userMdl.findByIdAndUpdate(req.user.id ,{
               name : value.name ,
               lastname : value.lastname , 
               password : req.body.password , 
               bio : value.bio  
     },{new:"true"}).select("-password -refreshtoken");
     res.status(200).json({message: "your profile has been updated successfuly", updatedUser});
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
     res.status(200).json({
          message : "pfp uploaded succesfully",
          profilePic: req.user.profilePic
     });
}

)


const deleteProfileCtrl =asyncHandler(async(req,res)=>{
     //delete him from the db
     const usertodelete = await userMdl.findByIdAndDelete(req.params.id);
     
     
     if(!usertodelete) return res.status(400).json({message: "user not found or already deleted"});
     
     //delete his pfp the cloud 
     if(usertodelete.profilePic.publicid) await removeImageFCloudinary(usertodelete.profilePic.publicid);
     

     // Get all user's posts first
     const userposts = await postMdl.find({author : usertodelete._id}) ; 
     
     // Get array of post picture publicids for cloudinary deletion
     var userPostPicsPubids = [] ;
     for(let post of userposts){
          if(post.photo.publicid) {
               userPostPicsPubids[userPostPicsPubids.length] = post.photo.publicid ; 
          }
     }

     // Delete post images from cloudinary
     if(userPostPicsPubids.length > 0){
          await removeImagesFCloudinary(userPostPicsPubids);
     }

     // Delete all comments on user's posts AND comments by the user
     // Comments on user's posts
     const userPostIds = userposts.map(post => post._id);
     if(userPostIds.length > 0){
          await commentMdl.deleteMany({postid : { $in: userPostIds }});
     }
     // Comments by the user 
     await commentMdl.deleteMany({Authorid : usertodelete._id});
     
     // Delete all user's posts (this also removes likes stored in those posts)
     await postMdl.deleteMany({author : usertodelete._id});
     
     // Remove user's likes from other posts (posts not owned by the user)
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
               await post.save();
          }
     }
     //remove his access token in case its his profile like if he is not an admin trying to delete an other user profile
     if(req.params.id == req.user.id)    {
          console.log(req.user.id ,'and req.params.id = ',req.params.id);
          res.clearCookie('accessT', {
          httpOnly: true,
          secure: process.env.node_env === 'production',
          sameSite: 'strict'
        });
     }
     res.status(200).json({message : "profile deleted successfully"})

}
)


module.exports =
{getAllUsersCtrl , getUserProfileCtrl,updateUserProfileCtrl,numberOfUsersCtrl,uploadProfilePicCtrl,
     deleteProfileCtrl};