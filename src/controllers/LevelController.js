const LevelService = require("../services/LevelService");

class LevelController {
    async findAll(req, res) {
        try {
            const level = await LevelService.findAll();
            return res.status(200).json(level);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async findById(req, res) {
        try {
            const level = await LevelService.findById(req.params.id);
            return res.status(200).json(level);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async create(req, res) {
        try {
            const level = await LevelService.create(req.body);
            return res.status(200).json(level);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async update(req, res) {
        try {
            const level = await LevelService.update(req.params.id, req.body);
            return res.status(200).json(level);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async delete(req, res) {
        try {
            const level = await LevelService.delete(req.params.id);
            return res.status(200).json(level);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new LevelController();