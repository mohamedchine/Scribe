const cloudinary = require ('../config/cloud') ; 
const removeImageFCloudinary = (publicid)=>{
    cloudinary.uploader.destroy(publicid) ; //cloudinary predifened methode
}
module.exports = removeImageFCloudinary;