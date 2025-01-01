const joi = require("joi");
const passwordStructure = ()=>{
    return joi.string().required().min(8).pattern(/[A-Z]/).pattern(/[a-z]/).pattern(/[0-9]/).pattern(/[^A-Za-z0-9]/) //btw in regex the ^ if inside the brackets it means negatiations and if right after the / it means at the start of the string , + means one or more occurence of the previous element $ means the end of the string
} 
const nameStructure =()=>{
    return joi.string().min(2).max(20).required().trim().pattern(/^[a-zA-Z]+$/); //start with string ^, ends with string $  , one or more occurence of letters + => only contains letters
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
        name  : nameStructure().optional(), 
        lastname  : nameStructure().optional() , 
        newpassword: passwordStructure().optional(),
        oldpassword : passwordStructure().optional(),
        bio: joi.string().optional(),
    });
    //by default everything in the schema is required so we need to add the optional methode
    return schema.validate(obj);
}

module.exports = {validateUserInputLR,validateUpdateUser} ; 