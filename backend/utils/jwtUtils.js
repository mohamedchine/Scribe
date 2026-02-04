const jwt = require("jsonwebtoken") ; 

const genjwt=(payload , expiration,key)=>{
      const token = jwt.sign(payload , key ,{expiresIn:expiration}); 
      return token ; 
}
const verifyjwt = (token ,key)=>{
      try{
            const {id} = jwt.verify(token ,key); 
            return id ;
}
catch(e){
      
     return null;
}
}
module.exports = {genjwt,verifyjwt} ;