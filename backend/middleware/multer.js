const multer = require('multer') ;  // multer for parsing file and uplpoading them to the storage which is the cloudinary in our situation
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloud');


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req,file)=>{
        return{
        folder: file.fieldname+'s',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp']
    }}
}); //cloudinaryStorage is good pckg rather then storing it locally then storing the pfp in cloud it give u direct access to cloud from multer

const upload = multer({storage : storage ,limits: { fileSize: 1024*1024 }}) ; 
module.exports = upload ; 