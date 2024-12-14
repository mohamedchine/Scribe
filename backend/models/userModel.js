const {Schema , model} = require("mongoose");
const dbconnection = require('../config/db');
const userSchema = new Schema ({
    name : {
        type:String , 
        required:true ,
          
    } , 
    lastname : {
        type:String , 
          }
    ,
    email :{
        type : String , 
        required :true ,
        unique : true
    },
    password : {
        type : String , 
        required :true 
    }
    ,profilePic : {
        type:Object , 
        default :{
            url : "https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/",
            publicid : null ,
        }
    },
    bio :String , 
    isAdmin :{
        type : Boolean , 
        default: false
    }, 
    isAccountVerified:{
        type : Boolean , 
        default:false 
    },
    refreshtoken:{
        type:String,
        default:""
    }

},{timestamps : true}) ; 
const userMdl = dbconnection.model("user" , userSchema) ; 
module.exports = userMdl ; 