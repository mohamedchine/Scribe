const joi = require('joi') ; 
const mongoose = require('mongoose') ;
const validateCreateComment = (comment)=>{
    if(!mongoose.Types.ObjectId.isValid(comment.postid)){
        return {error :{details : [{message : "invalid postid"}]}} ; 
    } 
    const commentStructure = joi.object({
        postid : joi.string().required() , 
        value : joi.string().required ()
    }) ; 
    
    return commentStructure.validate(comment) ; 
} ;
const validateUpdateComment = (comment)=>{
    const commentStructure = joi.object({ 
        value : joi.string().required ()
    }) ; 
    return commentStructure.validate(comment) ; 
} ;

module.exports ={validateCreateComment,validateUpdateComment}  ; 