const commentRoutes = require("express").Router() ; 
const {createCommentCtrl,getAllCommentsCtrl, deleteCommentCtrl, updateCommentCtrl} = require('../controllers/commentsCtrl') ;
const {verifytoken,verifytokenandadmin} = require('../middleware/verifyotken');
const validateObjid = require('../middleware/validateobjid')
commentRoutes.route('/') .post(verifytoken ,createCommentCtrl).get(verifytokenandadmin,getAllCommentsCtrl) ; 
commentRoutes.route('/:id') .delete(verifytoken ,  validateObjid ,deleteCommentCtrl).put(verifytoken ,validateObjid,updateCommentCtrl)
module.exports = commentRoutes ; 