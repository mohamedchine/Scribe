const { validateCreateCat, categoryMdl } = require("../models/categoryModel");
const asyncHandler =require("express-async-handler") ; 

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
    const categorydeleted = await categoryMdl.findByIdAndDelete(req.params.id) ;
    if(!categorydeleted) return res.status(400).json({message : "category not found or already deleted"});
    res.status(200).json(categorydeleted);
})

module.exports = {createCatCtrl,getAllcategoriesCtrl , deleteCategoryCtrl} ; 