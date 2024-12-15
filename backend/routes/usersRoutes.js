const getAllUsersCtrl = require('../controllers/usersCtrl');
const {verifytoken,verifytokenandadmin} = require('../middleware/verifyotken');
const usersRoutes =require('express').Router();
usersRoutes.get('/users' , verifytokenandadmin,getAllUsersCtrl) ; 


module.exports = usersRoutes ; 