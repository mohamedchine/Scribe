const mongoose = require("mongoose");
const dbconnection = require('../config/db');

const verificationTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user"
  },
  token: {
    type: String,
    required: true
  }
}, { timestamps: true });

const verificationTokenMdl = dbconnection.model("verificationToken", verificationTokenSchema);
module.exports = verificationTokenMdl;
