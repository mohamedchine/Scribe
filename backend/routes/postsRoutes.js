const postRoutes = require('express').Router() ; 
const {createPostCtrl , getAllPostsCtrl,getSinglePostCtrl,numberOfPostsCtrl,deletePostCtrl} = require('../controllers/postCtrl') ;
const upload = require('../middleware/multer') ; 
const validateObjid = require('../middleware/validateobjid');
const {verifytoken} = require('../middleware/verifyotken');
postRoutes.post('/createpost' ,verifytoken , upload.single('postpic'), createPostCtrl) ; 
postRoutes.get('/' , getAllPostsCtrl);
postRoutes.get('/nPosts' , numberOfPostsCtrl) ; 
postRoutes.route('/:id').get (validateObjid, getSinglePostCtrl).delete(validateObjid , deletePostCtrl) ;

module.exports = postRoutes;