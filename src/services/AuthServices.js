const UserService = require("./UserService");
const hashPassword = require("../utils/hashPassword");
const TokenService = require("./TokenService");
const { generateAccessToken } = require("../utils/generateToken");
const RoleService = require("./RoleService");
class AuthService {
  async loginUser(req, res) {
    const { email, password, rememberMe } = req.body;
    if (!email || !password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const user = await UserService.findOne({email});
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = hashPassword(password) === user.password;
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateAccessToken(user, rememberMe ? "1y" : "1w");

    const existingToken = await TokenService.findOne({ userId: user._id });

    if (existingToken) {
      await TokenService.update(existingToken._id, { token });
    } else {
      await TokenService.create({ userId: user._id, token });
    }

    const tokenInDb = await TokenService.findOne({ token });
    if (!tokenInDb) {
      return res.status(401).json({ message: "Invalid token" });
    }

    return res.status(200).json({ status: true, token, user, message: "Login successful" });
  }

  async registerUser(req, res) {
    const { email, password, name,surname, avatar } = req.body;
    const hashedPassword = hashPassword(password);

    if(!email || !password || !name || !surname ){
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const existingUser = await UserService.findOne({email});
    if (existingUser) {
      return res.status(401).json({ message: "User already exists" });
    }

    const role = await RoleService.findOne({name:'user'});
    if (!role) {
      return res.status(401).json({ message: "Role not found" });
    }

    const body = {
      email,
      password:hashedPassword,
      name,
      surname,
      roleId:role._id,
    }

    const registerUser = await UserService.create(body);

    const token = generateAccessToken(registerUser, "1w");

    await TokenService.create({ userId: registerUser._id, token });

    return res.status(200).json({ status: true, token, user: registerUser, message: "User registered successfully" });
  }

  async logoutUser(req, res) {
    await TokenService.deleteOne({token:req.token});
    return res.status(200).json({ message: "Logout successful" });
  }
}

module.exports = new AuthService();
