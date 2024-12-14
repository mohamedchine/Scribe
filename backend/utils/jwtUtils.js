const jwt = require("jsonwebtoken") ; 
const genjwt=(payload , expiration)=>{
      const token = jwt.sign(payload , process.env.accessTokenkey,{expiresIn:expiration}); 
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