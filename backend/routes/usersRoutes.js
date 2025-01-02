const {getAllUsersCtrl , getUserProfileCtrl ,updateUserProfileCtrl,numberOfUsersCtrl,uploadProfilePicCtrl} = require('../controllers/usersCtrl');
const {verifytoken,verifytokenandadmin,verifytokenandownership} = require('../middleware/verifyotken');
const upload = require('../middleware/multer') ;
const validateObjid = require('../middleware/validateobjid');
const usersRoutes = require('express').Router();

usersRoutes.get('/users' , verifytokenandadmin,getAllUsersCtrl) ; 
usersRoutes.route('/profile/:id').get(validateObjid , getUserProfileCtrl).put(validateObjid,verifytokenandownership,updateUserProfileCtrl);
usersRoutes.get('/NumberOfUsers' ,verifytokenandadmin,numberOfUsersCtrl);

usersRoutes.post('/uploadpfp', verifytoken,upload.single('pfp'), uploadProfilePicCtrl);

module.exports = usersRoutes;
