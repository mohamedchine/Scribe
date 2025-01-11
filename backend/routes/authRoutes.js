const {Router} = require("express") ;
const {loginLimiter} =require('../middleware/Limiter') ;
//imma add it in future with some recaptcha
const authRoutes = Router() ;
const {registerctrl , loginctrl} = require("../controllers/authCtrl");
authRoutes.post('/register' , registerctrl);
authRoutes.post ('/login' , loginctrl) ; 

module.exports = authRoutes;
