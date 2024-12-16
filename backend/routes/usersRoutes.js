const {getAllUsersCtrl , getUserProfileCtrl ,updateUserProfileCtrl} = require('../controllers/usersCtrl');
const {verifytoken,verifytokenandadmin,verifytokenandownership} = require('../middleware/verifyotken');
const validateObjid = require('../middleware/validateobjid');
const usersRoutes =require('express').Router();
usersRoutes.get('/users' , verifytokenandadmin,getAllUsersCtrl) ; 
usersRoutes.route('/profile/:id').get(validateObjid , getUserProfileCtrl).put(validateObjid,verifytokenandownership,updateUserProfileCtrl);

module.exports = usersRoutes ; 