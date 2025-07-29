const {getAllUsersCtrl , getUserProfileCtrl ,updateUserProfileCtrl,numberOfUsersCtrl,uploadProfilePicCtrl,deleteProfileCtrl} = require('../controllers/usersCtrl');

const {verifytoken,verifytokenandadmin,verifytokenandownership , verifytokenAndownershiptOradmin} = require('../middleware/verifyotken');

const upload = require('../middleware/multer') ;
const validateObjid = require('../middleware/validateobjid');
const usersRoutes = require('express').Router();

usersRoutes.get('/' , verifytokenandadmin,getAllUsersCtrl) ; 


usersRoutes.route('/profile/:id').get(validateObjid , getUserProfileCtrl)
.put(validateObjid,verifytokenandownership,updateUserProfileCtrl)
.delete(validateObjid,verifytokenAndownershiptOradmin,deleteProfileCtrl)


usersRoutes.get('/Count' ,verifytokenandadmin,numberOfUsersCtrl);

usersRoutes.post('/uploadpfp', verifytoken,upload.single('pfp'), uploadProfilePicCtrl);

module.exports = usersRoutes;
