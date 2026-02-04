const cloudinary = require ('../config/cloud') ; 
const removeImageFCloudinary = async(publicid)=>{
    await cloudinary.uploader.destroy(publicid) ; //cloudinary predifened methode
}
const removeImagesFCloudinary = async(publicids)=>{
    await cloudinary.api.delete_resources(publicids);
}
module.exports = {removeImageFCloudinary,removeImagesFCloudinary};