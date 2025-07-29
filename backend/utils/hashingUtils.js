const bcrypt = require("bcrypt") ; 
const hashPassword = async(pass)=>{
    const hashedpassword = await bcrypt.hash(pass,10) ; 
    return hashedpassword ; 
}
const comparePasswords = async(password , hashedpassword)=>{ 
    const match = await bcrypt.compare(password,hashedpassword) ; 
    
    return match ; 
}
// hashPassword("raniaxyz").then((ps)=>(console.log(ps))) ; 
// comparePasswords("raniaxyz","$2b$10$YBqqRZaYVXEmx2kIvd6qR.iGQFFalQEqDYCwdI.ruPje7ZM5HY0Si").then((equal)=>(console.log(equal))); for the test
module.exports = {hashPassword , comparePasswords} ; 