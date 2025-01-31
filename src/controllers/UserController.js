const UserService = require("../services/UserService");

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
            const user = await UserService.findUserById(req.params.id);
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
            const user = await UserService.updateUser(req.params.id, req.body);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            await UserService.deleteUser(req.params.id);
            return res.status(200).json({ message: "User deleted" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UserController;