const mongoose = require("mongoose") ; 
const db = require('../config/db') ; 
const commentSchema = new mongoose.Schema({
    postid : {
       type:mongoose.Schema.Types.ObjectId , 
       ref : "post" , 
       required : true
    } , 
    author : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "user" , //who type the comment   
        required : true 
    } ,
    value : {
        type : String , 
        required : true 
    }
    
},{timestamps : true}) ; 
const commentMdl = db.model("comment" , commentSchema) ; 
module.exports = commentMdl ;