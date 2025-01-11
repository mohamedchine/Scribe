const reftokenRoute = require('express').Router();
const refreshTokenCtrl = require('../controllers/refreshTokenCtrl');

reftokenRoute.get('/getaccessT' ,refreshTokenCtrl );

module.exports = reftokenRoute;