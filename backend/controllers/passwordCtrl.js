const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const verificationTokenMdl = require("../models/verificationTokenModel");
const sendEmail = require("../utils/mailUtils");
const { hashPassword } = require("../utils/hashingUtils");
const userMdl = require("../models/userModel");
const { validateNewPassword, validateEmail } = require("../utils/uservalidationUtils");



//send reset link to the user email
 
module.exports.sendResetPasswordLinkCtrl = asyncHandler(async (req,res) => {
   // 1. Validation
   const { error } = validateEmail(req.body.email);
   if(error) {
    return res.status(400).json({ message: error.details[0].message });
   }

   // 2. Get the user from DB by email
   const user = await userMdl.findOne({ email: req.body.email });
   if(!user) {
    return res.status(404).json({ message: "User with given email does not exist!" });
   }

   // 3. Creating VerificationToken
   //u can do it save the token in the db or u can make it stateless(as we did in the email verification) bouth works the same 
   let verificationToken = await verificationTokenMdl.findOne({ userId: user._id });
   if(!verificationToken) {
    verificationToken = await verificationTokenMdl.create({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
    });
   }

   // 4. Creating link
   const link = `${process.env.CLIENT_DOMAIN}/reset-password/${user._id}/${verificationToken.token}`;
   // 5. Creating HMTL template
   const htmlTemplate = `<a href="${link}">Click here to reset your password</a>`;
   // 6. Sending Email
   await sendEmail(user.email,"Reset Password",htmlTemplate);
   // 7. Response to the client
   res.status(200).json({
    message: "Password reset link sent to your email, Please check your inbox"
   })
});

//user clicks link the frontend hit this before rendering the page
module.exports.getResetPasswordLinkCtrl = asyncHandler(async (req,res) => {
    const user = await userMdl.findById(req.params.userId);
    if(!user) {
        return res.status(400).json({ message: "invalid link" });
    }

    const verificationToken = await verificationTokenMdl.findOne({
        userId: user._id,
        token: req.params.token,
    });
    if(!verificationToken) {
        return res.status(400).json({ message: "invalid link" });
    }
    
    res.status(200).json({ message: "Valid url" });
});

//then if that link is valid user can enter his new password and hit this endpoint
module.exports.resetPasswordCtrl = asyncHandler(async (req,res) => {
   const { error } = validateNewPassword(req.body);
   if(error) {
    return res.status(400).json({ message: error.details[0].message });
   }

   const user = await userMdl.findById(req.params.userId);
   if(!user) {
    return res.status(400).json({ message: "invalid link" });
   }

   const verificationToken = await verificationTokenMdl.findOne({
    userId: user._id,
    token: req.params.token,
   });
   if(!verificationToken) {
    return res.status(400).json({ message: "invalid link" });
   }

   if(!user.isAccountVerified) {
    user.isAccountVerified = true;
   }

   
   const hashedPassword = await hashPassword(req.body.password);

   user.password = hashedPassword;
   await user.save();
   await verificationToken.deleteOne();

   res.status(200).json({ message: "your password has been reset successfully, you can now log in with your new password" });
});