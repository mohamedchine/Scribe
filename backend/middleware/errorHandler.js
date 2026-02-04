const multer = require('multer');
const errorHandler = ((err, req, res, next) => { 
    if (err instanceof multer.MulterError) {
      if (err.code == 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'Maximum allowed picture size is 1 MB.' });
      }
      if(err.code =="LIMIT_UNEXPECTED_FILE"){
        return res.status(400).json({message : "incorrect key"});
      }
    } 
    if(err.message =='An unknown file format not allowed' ){
      return res.status(400).json({message : "please upload a valid image in this extension jpg, jpeg, png, gif, webp "});
    }
   res.status(500).json({message : 
    err.message
   })
  });
module.exports = errorHandler;