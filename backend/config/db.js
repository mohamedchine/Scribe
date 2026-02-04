const mongoose = require("mongoose");

// this is a better approatch than mongoose.connect , it works with multiple dbs
const dbconnection = mongoose.createConnection(process.env.dburl);
module.exports=dbconnection;