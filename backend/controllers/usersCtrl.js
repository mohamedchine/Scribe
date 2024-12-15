const userMdl = require('../models/userModel');
const getAllUsersCtrl = async(req,res)=>{
     const users = await userMdl.find() ; 
     res.status(200).json(users);
}
module.exports =getAllUsersCtrl;