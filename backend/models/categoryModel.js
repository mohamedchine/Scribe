const mongoose = require("mongoose") ; 
const joi =require('joi');
const db =require('../config/db') ;
const categorySchema = new mongoose.Schema({
    title :{
        type : String , 
        require : true , 
        trim :true 
    } ,
    author : {
        type : mongoose.Schema.Types.ObjectId ,
        required : true , 
        ref : "user"  
    }
}) ;
const categoryMdl = db.model("category" , categorySchema);



const validateCreateCat =(category)=>{
    const categoryStruct = joi.object({
        title : joi.string().required() ,
    })
    return categoryStruct.validate(category) ;
}


module.exports = {categoryMdl,validateCreateCat};