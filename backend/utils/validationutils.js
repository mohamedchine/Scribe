const joi = require("joi"); 
const validateuserinput = (user , isRegistering ) =>{
    
    let inputstructure = joi.object({
        email : joi.string().required().trim().email(),
        password : joi.string().required().min(8).pattern(/[A-Z]/).pattern(/[a-z]/).pattern(/[0-9]/).pattern(/[^A-Za-z0-9]/) //btw in regex the ^ if inside the brackets it means negatiations and if right after the / it means at the start of the string , + means one or more occurence of the previous element $ means the end of the string
    });
     if(isRegistering){ //add validation fields if the user is registering
        //cuz the key methode returns a new joi object we need to reassign it
       inputstructure =  inputstructure.keys( 
          {  name  : joi.string().min(2).max(20).required().trim().pattern(/^[a-zA-Z]+$/), //start with string ^, ends with string $  , one or more occurence of letters + => only contains letters
        lastname  : joi.string().min(2).max(20).required().trim().pattern(/^[a-zA-Z]+$/)})
     }
    return inputstructure.validate(user);
  
}
module.exports = validateuserinput ; 