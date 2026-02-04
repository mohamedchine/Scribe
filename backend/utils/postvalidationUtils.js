const joi = require('joi') ; 
const validatePost = (post) => {
    const postStructure = joi.object({
      title: joi.string().min(3).max(1000).required().messages({
        'string.base': 'Title must be a string',
        'string.min': 'Title must be at least 3 characters long',
        'string.max': 'Title cannot exceed 1000 characters',
        'any.required': 'Title is required',
        'string.empty': 'Title is required'
      }),
  
      desc: joi.string().min(5).max(1000).required().messages({
        'string.base': 'Description must be a string',
        'string.min': 'Description must be at least 5 characters long',
        'string.max': 'Description cannot exceed 1000 characters',
        'any.required': 'Description is required',
        'string.empty': 'Description is required'
      }),
  
      category: joi.string().required().messages({
        'string.base': 'Category must be a string',
        'any.required': 'Category is required',
        'string.empty': 'Category is required'
      })
    });
  
    return postStructure.validate(post);
  };
  
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
    title: joi.string().min(3).max(100).required().messages({
      'string.base': 'Title must be a string',
      'string.min': 'Title must be at least 3 characters long',
      'string.max': 'Title cannot exceed 100 characters',
      'any.required': 'Title is required',
      'string.empty': 'Title is required'
    }),

    desc: joi.string().min(5).max(1000).required().messages({
      'string.base': 'Description must be a string',
      'string.min': 'Description must be at least 5 characters long',
      'string.max': 'Description cannot exceed 1000 characters',
      'any.required': 'Description is required',
      'string.empty': 'Description is required'
    }),

    category: joi.string().required().messages({
      'string.base': 'Category must be a string',
      'any.required': 'Category is required',
      'string.empty': 'Category is required'
    })
  });

  return postStructure.validate(post);
};
module.exports = {validatePost  , validateUpdatePost} ;