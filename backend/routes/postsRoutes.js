const postRoutes = require('express').Router() ; 
const {createPostCtrl , getAllPostsCtrl,getSinglePostCtrl,numberOfPostsCtrl,deletePostCtrl,updatePostCtrl,ModifyPostPicCtrl, removeOrAddLike} = require('../controllers/postCtrl') ;
const upload = require('../middleware/multer') ; 
const validateObjid = require('../middleware/validateobjid');
const {verifytokenAndownershiptOradmin,verifytoken,verifytokenAndPostOwnership} = require('../middleware/verifyotken');
postRoutes.post('/createpost' ,verifytoken , upload.single('postpic'), createPostCtrl) ; 
postRoutes.get('/' , getAllPostsCtrl);
postRoutes.get('/Count' , numberOfPostsCtrl) ; 
postRoutes.route('/:id').get(validateObjid, getSinglePostCtrl).delete(validateObjid , verifytoken,deletePostCtrl).put(validateObjid,verifytokenAndPostOwnership,updatePostCtrl) ;
postRoutes.post('/:id/update-image',validateObjid,verifytokenAndPostOwnership,upload.single('postpic'),ModifyPostPicCtrl) ; 
postRoutes.put('/like/:id' ,validateObjid,verifytoken ,removeOrAddLike  ) ; 
module.exports = postRoutes;