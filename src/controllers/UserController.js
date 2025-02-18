const UserService = require("../services/UserService");
const UserLevelService = require("../services/UserLevelService");
class UserController {
    
    async findUsers(req, res) {
        try {
            const users = await UserService.findAll({},"nickname email avatar deviceId roleId createdAt","roleId");
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async findUserById(req, res) {
        try {
            const user = await UserService.findById(req.params.id);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async createUser(req, res) {
        try {
            const user = await UserService.createUser(req.body);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            if(req.body.nickname){
                const user = await UserService.findOne({nickname:req.body.nickname});
                if(user){
                    return res.status(400).json({ error: "Nickname already exists" });
                }
            }
            const user = await UserService.update(req.params.id, req.body);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const id = req.params.id;
            const userId = req.user.id;
            if(id!==userId){
                return res.status(400).json({ error: "You cannot delete this account" });
            }
            await UserService.deleteById(id);
            await UserLevelService.deleteAll({userId:userId});
            return res.status(200).json({ message: "User deleted" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UserController;