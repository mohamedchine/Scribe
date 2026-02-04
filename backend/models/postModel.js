    const mongoose = require ('mongoose') ; 
const dbconnection = require('../config/db') ; 
const postschema = new mongoose.Schema({
    title : {
        type : String , 
        required : true , 
        require : true ,
        minLength : 3 ,
        maxLength : 100
    }, 
    description : {
        type : String , 
        required : true,
        minLength : 5, 
        maxLength : 1000  
    } , 
    category :{
        type : String  , 
        required : true 
    } , 

    photo : {
         url : {
            type : String , 
            default : ""
          } ,
          publicid :{
           type : String , 
           default : null 
          }
     } ,
    author :{
        type:mongoose.Schema.Types.ObjectId , 
        ref : "user" , //ref to the user doc 
        required :true 
    } , 
    likes : [
        {
            type : mongoose.Schema.Types.ObjectId , 
            ref : "user" 
        }
    ]
},{timestamps : true , toJSON:{virtuals : true} ,toObject:{virtuals : true}});
const postMdl = dbconnection.model("post" , postschema) ;
module.exports =  postMdl ;  