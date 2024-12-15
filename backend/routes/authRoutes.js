const {Router} = require("express") ;
const authRoutes = Router() ;
const {registerctrl , loginctrl} = require("../controllers/authCtrl");
authRoutes.post('/register' , registerctrl);
authRoutes.post ('/login' , loginctrl) ; 
module.exports = authRoutes;
