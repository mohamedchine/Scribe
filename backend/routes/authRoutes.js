const {Router} = require("express") ;
const authrouter = Router() ;
const {registerctrl , loginctrl} = require("../controllers/authCtrl");
authrouter.post('/register' , registerctrl)
authrouter.post ('/login' , loginctrl) ; 
module.exports = authrouter;
