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
        url: {
            type: String,
            default: "https://res.cloudinary.com/djgbl5dhd/image/upload/v1769813744/user-avatar_ltk33r.png"
        },//for viewing
        publicid: {
            type: String,
            default: null
        }//for cloudinary to manage the picture  
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
        type:String, //change it in the future to array to make the app support multiple devices
    }

},{timestamps : true , 
toJSON : {virtuals : true} //its like telling mongoose to include the virtuals when we are transforming the user into json (sending it using res.json())
,toObject : {virtuals : true}} //let the virtual show when toObject is called ,mongoose calls toobject internally when finding a doc so always use it 
) ; 
userSchema.virtual("fullname").get(function () {
    return `${this.name} ${this.lastname || ""}`.trim();
});
userSchema.virtual("posts",{
    ref:"post"  //doc name not collection
    ,foreignField : "author" , 
    localField : "_id"
}) ; 
//return all posts made by that user virtually not stored in db (instead of looking for them our selves or saving them in userdoc we save them virtually and we get them using populate);
//is like select from post user where author = user.id in sql or await post.find({author : userid}) but we make it this way so we dont have to use find methode and we get them using populate directly 

const userMdl = dbconnection.model("user" , userSchema) ; 
module.exports = userMdl ; 