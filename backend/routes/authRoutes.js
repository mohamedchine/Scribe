const {Router} = require("express") ;
const {loginLimiter} =require('../middleware/Limiter') ;
//imma add it in future with some recaptcha
const authRoutes = Router() ;
const {registerctrl , loginctrl, checkAuthctrl, logoutctrl,verifyEmailCtrl} = require("../controllers/authCtrl");
const verifyrecaptcha = require("../middleware/verifyRecaptcha");
authRoutes.post('/register' ,verifyrecaptcha("register"), registerctrl);
authRoutes.post ('/login' , loginLimiter,verifyrecaptcha("login"), loginctrl) ; 
authRoutes.post('/check' , checkAuthctrl);
authRoutes.post('/logout',logoutctrl) ;
authRoutes.get('/:userId/verify/:token', verifyEmailCtrl);
module.exports = authRoutes;