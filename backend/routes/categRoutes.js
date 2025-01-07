const { createCatCtrl, getAllcategoriesCtrl, deleteCategoryCtrl } = require("../controllers/categoryCtrl");
const { verifytokenandadmin } = require("../middleware/verifyotken");
const validateObjid = require("../middleware/validateobjid");
const categRoutes = require("express").Router() ;

categRoutes.route('/').post(verifytokenandadmin ,createCatCtrl) .get(getAllcategoriesCtrl);
categRoutes.delete('/:id' ,validateObjid,verifytokenandadmin, deleteCategoryCtrl)


module.exports = categRoutes ; 