const crypto = require("crypto");


const accessTokenKey = crypto.randomBytes(64).toString("hex");
const refreshTokenKey = crypto.randomBytes(64).toString("hex");

console.log("Access Token Key:", accessTokenKey);
console.log("Refresh Token Key:", refreshTokenKey)