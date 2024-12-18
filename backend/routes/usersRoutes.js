const {getAllUsersCtrl , getUserProfileCtrl ,updateUserProfileCtrl,numberOfUsersCtrl} = require('../controllers/usersCtrl');
const {verifytoken,verifytokenandadmin,verifytokenandownership} = require('../middleware/verifyotken');
const validateObjid = require('../middleware/validateobjid');
const usersRoutes =require('express').Router();
usersRoutes.get('/users' , verifytokenandadmin,getAllUsersCtrl) ; 
usersRoutes.route('/profile/:id').get(validateObjid , getUserProfileCtrl).put(validateObjid,verifytokenandownership,updateUserProfileCtrl);
usersRoutes.get('/NumberOfUsers' ,verifytokenandadmin,numberOfUsersCtrl)
module.exports = usersRoutes ; 