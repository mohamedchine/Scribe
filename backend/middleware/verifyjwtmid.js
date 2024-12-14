const verifyjwt = require('../utils/jwtUtils') ; 
const verifAccessT = (req,res)=>{
    if(!req.cookies?.accessT) return res.status(401);
    const id = verifyjwt(req.cookies.accessT , process.env.accessTokenkey) ; 
    if(!id) return res.status(401);  
    req.id = id ; 
    next();
}