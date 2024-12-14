const mongoose = require("mongoose");

require("dotenv").config({ path: require('path').join(__dirname, '../.env')});
// this is a better approatch than mongoose.connect , it works with multiple dbs 
const dbconnection = mongoose.createConnection(process.env.dburl);

module.exports=dbconnection;