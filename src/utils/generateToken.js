const JWT = require("jsonwebtoken");

const generateAccessToken = (user, expireTime) => {
    return JWT.sign(
      { name: user.email,id:user._id ,mail:user.mail,role:user.role},
      process.env.ACCESS_TOKEN_SECRET_KEY,
      {
        expiresIn: expireTime || "1w",
      }
    );
  };

  module.exports = { generateAccessToken };