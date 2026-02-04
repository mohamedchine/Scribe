const {validateCreateComment , validateUpdateComment} = require('../utils/commentvalidationUtils') ;
const commentMdl = require('../models/commentModel');
const userMdl = require('../models/userModel') ; 
const postMdl = require('../models/postModel') ; 
const asyncHandler = require("express-async-handler");
const createCommentCtrl = asyncHandler(async(req,res) =>{
    const {error} = validateCreateComment(req.body) ; 
    if(error){
        return res.status(400).json({message :error.details[0].message}) ; 
    } 
    //check if post exist
    const post =await postMdl.findOne({_id : req.body.postid}) ; 
    if(!post){
        return res.status(404).json({message : "post not found"});
    } 
    const createdComment  = await commentMdl.create({
        postid : req.body.postid , 
        author : req.user._id , 
        value : req.body.value , 
    })
    const comment = await commentMdl
    .findById(createdComment._id)
    .populate("author", "-password -refreshtoken");
    return res.status(201).json(comment);
}

)

const getAllCommentsCtrl = asyncHandler(async(req,res)=>{
    const comments  = await commentMdl.find().populate('author' ,["-password" ,"-refreshtoken","-email"]);
    return res.status(200).json(comments); 
}
)
const deleteCommentCtrl =asyncHandler( async(req,res)=>{
    
    const comment = await commentMdl.findOne ({_id : req.params.id}) ;
    if(!comment) return res.status(404).json({message: "comment not found or have been already deleted "}) ; 
    
    //only author or admin can delete comments
    if( !req.user.isAdmin && !req.user._id.equals(comment.author)){
        return res.status(403).json({message:"u can't delete somoene elses comment"});
    }
    await comment.deleteOne();
    return res.status(200).json({message :"comment deleted successfuly"}) ;
}
)

const updateCommentCtrl =asyncHandler( async(req,res)=>{
    
    const {error} = validateUpdateComment(req.body) ; 
    if(error) return res.status(400).json({message : "provide the new comment value please"}) ; 
    
    const comment = await commentMdl.findById(req.params.id) ; 
    if(!comment) return res.status(404).json({message:"comment not found"}) ;


    if(!comment.author.equals(req.user._id)) return res.status(403).json({message : "only comments author can update it"});

     const updatedcomment = await commentMdl.findByIdAndUpdate(req.params.id ,
    
        {
            value : req.body.value 
        }
     ,{new : true}).populate('author',["-password" ,"-refreshtoken","-email"]);
    return res.status(200).json(updatedcomment) ; 
}
)


module.exports = {createCommentCtrl,getAllCommentsCtrl,deleteCommentCtrl,updateCommentCtrl} ;