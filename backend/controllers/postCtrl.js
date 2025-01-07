const {validatePost, validateUpdatePost} = require('../utils/postvalidationUtils') ;
const postMdl = require('../models/postModel');
const commentMdl = require('../models/commentModel');
const asyncHandler =require("express-async-handler");
const { removeImageFCloudinary }= require('../utils/cloudinary');

const createPostCtrl = asyncHandler(async(req , res)=>{
     
    if(!req.file){
        return res.status(400).json({message : "no picture provided"}) ; 
      }
    const {error} = validatePost(req.body) ; //multer is the one responsible for the parsing of the other fields
    if(error){
       return res.status(400).json({message : error.details[0].message});
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
    const posts = await postMdl.find(category).skip(isNaN(pageNumber) ? 0 : (pageNumber-1)*postPerPage).limit(isNaN(pageNumber)?  0 : postPerPage).populate('author' ,["-password" ,"-refreshtoken"]).sort({createdAt : -1});
    return res.status(200).json(posts);
})



const getSinglePostCtrl = asyncHandler(async(req,res)=>{
    const id = req.params.id ; 
    const post = await postMdl.findOne({_id : id}).populate('author',["-password" ,"-refreshtoken"]).populate("comments") ;
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
    await postMdl.findByIdAndDelete(req.params.id) ; 
    await removeImageFCloudinary(post.photo.publicid);
    
    await commentMdl.deleteMany({postid :post._id });
    
    res.status(200).json({message : "deleted succssfuly"});
})
//no admin only owner
const updatePostCtrl = asyncHandler(async(req,res)=>{
    const {error} =validateUpdatePost(req.body);
    if(error) return res.status(400).json({message : error.details[0].message});
    
    
    //if the data is aright 
    await postMdl.findByIdAndUpdate(req.params.id,{
        title : req.body.title , 
        description : req.body .description,
        category : req.body.category
    });
    res.status(200).json({message:"updated successfuly"});
}
)



const ModifyPostPicCtrl = asyncHandler(async(req,res)=>{

    if(!req.file)  return res.status(400).json({message : "u gotta do a picture"}) ; 
   
    await removeImageFCloudinary(req.post.photo.publicid); 

    [req.post.photo.publicid , req.post.photo.url] =[req.file.filename , req.file.path] ;  

    await req.post.save() ; 
    
    res.status(200).json({message : req.post});
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