const {validatePost, validateUpdatePost} = require('../utils/postvalidationUtils') ;
const postMdl = require('../models/postModel');
const commentMdl = require('../models/commentModel');
const asyncHandler =require("express-async-handler");
const { removeImageFCloudinary }= require('../utils/cloudinary');

const createPostCtrl = asyncHandler(async(req , res)=>{
    
    const {error} = validatePost(req.body) ; //multer is the one responsible for the parsing of the other fields
    if(error){
       return res.status(400).json({message : error.details[0].message});
    }
    if(!req.file){
        return res.status(400).json({message : "no picture provided"}) ; 
      }
    const post = new postMdl({
        title : req.body.title , 
        description : req.body.desc ,
        category : req.body .category ,
        photo :{
            url :req.file.path , 
            publicid : req.file.filename
        }
        ,author : req.user._id 
    }) ;
    await post.save() ;
    res.status(201).json({message : "post created succefully"});

}
)
const getAllPostsCtrl =asyncHandler(async(req,res)=>{
    const postPerPage = 3 ; 
    var {pageNumber , category} = req.query ;
    category  = category ? {category} : {};   //to find all if theres no category ;
    
    // If pageNumber is provided and valid, apply pagination; otherwise return all posts
    let query = postMdl.find(category).populate('author' ,["-password" ,"-refreshtoken"]).sort({createdAt : -1});
    
    if(pageNumber && !isNaN(pageNumber) && parseInt(pageNumber) > 0){
        const skip = (parseInt(pageNumber) - 1) * postPerPage;
        query = query.skip(skip).limit(postPerPage);
    }
    
    const posts = await query;
    return res.status(200).json(posts);
})



const getSinglePostCtrl = asyncHandler(async(req,res)=>{
    const id = req.params.id ; 
    var post = await postMdl.findOne({_id : id}).populate('author',["-password" ,"-refreshtoken"]) ;
    post = post.toObject(); //convert the mongoose object to a js object to accept the .
    const coments = await commentMdl.find({postid : id}).populate('author' ,["-password" ,"-refreshtoken","-email"]);
    post.comments = coments;
  
    post? res.status(200).json(post) : res.status(404).json({message : "post not found"}) ;
})

const numberOfPostsCtrl = asyncHandler(async(req,res)=>{
    const n = await postMdl.countDocuments() ; 
    res.status(200).json(n);
}
)

const deletePostCtrl = asyncHandler(async(req,res)=>{ 
    const post = await postMdl.findOne({_id :req.params.id}) ;
    if(!post) {
        return res.status(404).json({message:"no post found"});
    }
    // console.log(req.user._id ===post.author ,'and req.user.id  : ' ,req.user._id ,'and post.author = ',post.author  ,'and typeofuserid = ',typeof(req.user._id) ,'and typeofpostauthor = ', typeof(post.author)   ); 
    if(!req.user._id.equals(post.author) &&  !req.user.isAdmin){
        return res.status(403).json({message : "u cant just delete somoene elses post"});
    } 
    const postId = post._id;
    
    // Delete all comments on this post first
    await commentMdl.deleteMany({postid : post._id });
    
    // Delete post image from cloudinary
    if(post.photo.publicid) {
         await removeImageFCloudinary(post.photo.publicid);
    }
    
    // Delete the post (this also removes likes stored in the post document)
    await postMdl.findByIdAndDelete(req.params.id);
    
    res.status(200).json({message : "deleted succssfuly", postId});
})
//no admin only owner
const updatePostCtrl = asyncHandler(async(req,res)=>{
    const {error} =validateUpdatePost(req.body);
    if(error) return res.status(400).json({message : error.details[0].message});
    
    
    //if the data is aright 
    const newpost = await postMdl.findByIdAndUpdate(req.params.id,{
        title : req.body.title , 
        description : req.body.desc,
        category : req.body.category
    }, { new: true }).populate('author',["-password" ,"-refreshtoken"]);
    const coments = await commentMdl.find({postid :newpost._id}).populate('author' ,["-password" ,"-refreshtoken","-email"]);
    newpost.comments = coments;
    res.status(200).json({message:"updated successfuly" , newpost});
}
)



const ModifyPostPicCtrl = asyncHandler(async(req,res)=>{

    if(!req.file)  return res.status(400).json({message : "u gotta do a picture"}) ; 
   
    await removeImageFCloudinary(req.post.photo.publicid); 

    [req.post.photo.publicid , req.post.photo.url] =[req.file.filename , req.file.path] ;  

    await req.post.save() ; 
    
    res.status(200).json({ post: req.post });
}

)

const removeOrAddLike = asyncHandler(async(req,res)=>{
    const postid = req.params.id ; 
    const userid = req.user._id ; 
    
    const post = await postMdl.findById(postid) ; 
    if(!post) return res.status(404).json({message : "no post found"}) ; 


    if( ! post.likes.includes(userid)) {
        post.likes[post.likes.length] = userid
    } 
    else{
        var newLikesArray = [] ; 
        for(let i=0 ; i<post.likes.length ;i++){
            //whenever we are comparing two mongoose objectids we using equals in future
            if(!post.likes[i].equals(userid)){
                newLikesArray[newLikesArray.length] = post.likes[i] ; 
            }
        }
        post.likes = newLikesArray ; 
    };
    await post.save() ; 
    return res.status(200).json(post) ; 
})
module.exports = 
{createPostCtrl,getAllPostsCtrl ,
     getSinglePostCtrl,numberOfPostsCtrl,
     deletePostCtrl,updatePostCtrl,
     ModifyPostPicCtrl , removeOrAddLike} ;