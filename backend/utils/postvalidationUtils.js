const joi = require('joi') ; 
const validatePost = (post) =>{
    const postStrucutre = joi.object({
        title : joi.string().min(3).max(50).required(),
        desc : joi.string().min(10).max(1000).required(),
        category : joi.string().required()
    }) ; 
    return postStrucutre.validate(post) ; 
}
// const post = {
//     title : "" , 
//     desc : "look at the sky today so much fun " , 
//     category : "nature",
//     image : "lika"
// }
// const {error , value} = validatePost(post) ; 
// console.log(error,"\n" , value) ;
const validateUpdatePost = (post)=>{
    const postStructure = joi.object({
        title : joi.string().min(3).max(50),
        desc : joi.string().min(10).max(1000),
        category : joi.string()
    })
} 
module.exports = {validatePost  , validateUpdatePost} ;