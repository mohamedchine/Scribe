const {validatePost} = require('../utils/postvalidationUtils') ;
const postMdl = require('../models/postModel');
const createPostCtrl = async(req , res)=>{
     
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

const getAllPostsCtrl =async(req,res)=>{
    const postPerPage = 3 ; 
    var {pageNumber , category} = req.query ;
    category  = category ? {category} : {};   //to find all if theres no category ;
    const posts = await postMdl.find(category).skip(isNaN(pageNumber)?0 : (pageNumber-1)*postPerPage).limit(postPerPage).populate('author' ,["-password" ,"-refreshtoken"]).sort({createdAt : -1});
    return res.status(200).json(posts);
}



const getSinglePostCtrl = async(req,res)=>{
    const id = req.params.id ; 
    const post = await postMdl.findOne({_id : id}).populate('author',["-password" ,"-refreshtoken"]) ;
    post? res.status(200).json(post) : res.status(404).json({message : "post not found"}) ;
}

const numberOfPostsCtrl = async(req,res)=>{
    const n = await postMdl.countDocuments() ; 
    res.status(200).json(n);
}


deletePostCtrl = async(req,res)=>{
    console.log("hi");
}

module.exports = {createPostCtrl,getAllPostsCtrl , getSinglePostCtrl,numberOfPostsCtrl,deletePostCtrl} ;