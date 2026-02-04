const joi = require("joi");
const passwordStructure = () => {
  return joi
    .string()
    .min(8)
    .required()
    .pattern(/[A-Z]/, 'uppercase letter')
    .pattern(/[a-z]/, 'lowercase letter')
    .pattern(/[0-9]/, 'number')
    .pattern(/[^A-Za-z0-9]/, 'special character')
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.pattern.name': 'Password must contain at least one {#name}',
      'string.empty': 'Password is required',
    });
};
const nameStructure =()=>{
    return joi.string().min(2).max(20).required().trim().pattern(/^[a-zA-Z]+$/).messages({
        'string.min': 'Name must be at least 2 characters long',
        'string.max': 'Name cannot exceed 20 characters',
        'string.empty': 'name is obligatory',
        'string.pattern.base': 'Name should only contain letters (no spaces, numbers, or special characters)',
        'any.required': 'Name is required'
    }); //start with string ^, ends with string $  , one or more occurence of letters + => only contains letters
}



const validateUserInputLR = (user , isRegistering ) =>{
    
    let schema = joi.object({
        email : joi.string().required().trim().email(),
        password : passwordStructure()
    });
     if(isRegistering){ //add validation fields if the user is registering
        //cuz the key methode returns a new joi object we need to reassign it
       schema =  schema.keys( 
          {  name  : nameStructure(),
        lastname  : nameStructure()})
     }
    return schema.validate(user);
  
}


function validateUpdateUser(obj) {
    const schema = joi.object({
        name  : nameStructure() ,
        lastname  : nameStructure() , 
        password: passwordStructure().optional().allow(''),
        bio: joi.string().allow('').optional(),
    });
   
    return schema.validate(obj);
}

const validateEmail = (obj) => {
    const schema = joi.object({
        email: joi.string().required().trim().email()
    });
    return schema.validate(obj);
};

const validateNewPassword = (obj) => {
    const schema = joi.object({
        password: passwordStructure()
    });
    return schema.validate(obj);
};

module.exports = {validateUserInputLR, validateUpdateUser, validateEmail, validateNewPassword} ; 