const verifyjwt = require('../utils/jwtUtils'); 
const userMdl = require('../models/userModel');

const verifAccessT = async (req, res, next) => {
        if (!req.cookies?.accessT) return res.status(401);
        const id = verifyjwt(req.cookies.accessT, process.env.accessTokenkey); 
        if (!id) return res.status(401);  

        const user = await userMdl.findById(id); 
        if (!user) return res.status(401);


        req.id = user._id;
        next();

};