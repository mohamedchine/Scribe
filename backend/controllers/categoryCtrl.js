const { validateCreateCat, categoryMdl } = require("../models/categoryModel");
const asyncHandler =require("express-async-handler") ;
const postMdl = require('../models/postModel');
const commentMdl = require('../models/commentModel');
const { removeImagesFCloudinary } = require('../utils/cloudinary'); 

const createCatCtrl = asyncHandler(async(req,res)=>{
    const {error} = validateCreateCat(req.body) ; 
    if(error) return res.status(400).json({message : error.details[0].message}) ; 
    const cat = await categoryMdl.create({title : req.body.title , author : req.user._id}) ; 
     res.status(201).json(cat) ;  
} )

const getAllcategoriesCtrl =asyncHandler( async(req,res)=>{
    const categories = await categoryMdl.find() ; 
    res.status(200).json(categories) ;
})
const deleteCategoryCtrl  =asyncHandler( async( req,res)=>{
    const categorydeleted = await categoryMdl.findById(req.params.id);
    if(!categorydeleted) return res.status(400).json({message : "category not found or already deleted"});
    
    // Get all posts in this category
    const categoryPosts = await postMdl.find({category : categorydeleted.title});
    const categoryPostIds = categoryPosts.map(post => post._id);
    
    // Get array of post picture publicids for cloudinary deletion
    var postPicsPubids = [];
    for(let post of categoryPosts){
         if(post.photo.publicid) {
              postPicsPubids[postPicsPubids.length] = post.photo.publicid;
         }
    }
    
    // Delete post images from cloudinary
    if(postPicsPubids.length > 0){
         await removeImagesFCloudinary(postPicsPubids);
    }
    
    // Delete all comments on posts in this category
    if(categoryPostIds.length > 0){
         await commentMdl.deleteMany({postid : { $in: categoryPostIds }});
    }
    
    // Delete all posts in this category 
    await postMdl.deleteMany({category : categorydeleted.title});
    
    // Finally, delete the category itself
    await categoryMdl.findByIdAndDelete(req.params.id);
    
    res.status(200).json({message: "Category and all associated data deleted successfully", categorydeleted});
})

module.exports = {createCatCtrl,getAllcategoriesCtrl , deleteCategoryCtrl} ; 