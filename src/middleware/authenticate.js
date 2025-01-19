const JWT = require("jsonwebtoken");
const TokenService = require("../services/TokenService");
const UserService = require("../services/UserService");
const RoleService = require("../services/RoleService");
const authenticate = async  (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1] || null;
  if (token === null) {
    res.status(401).send({ error: "You must be logged in to do this." });
    return
  }

  try {
    const user = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
   
    const tokenInDb = await TokenService.findOne({ token });
    if (!tokenInDb) {
      return res.status(401).send({ error: "Invalid token" });
    }
    if(tokenInDb.expiresAt < Date.now()){
      return res.status(401).send({ error: "Token expired" });
    }

    let userDB;
    userDB = await UserService.findById(user.id);

    if (!userDB) {
      return res.status(401).send({ error: "Invalid token" });
    }

    let role;
    role = await RoleService.findById(userDB.roleId);

    req.user = userDB;
    req.role = role;
    req.token = token;
    next();
  } catch (err) {
    res.status(401).send({ error: err.message });
  }
};

module.exports = authenticate;