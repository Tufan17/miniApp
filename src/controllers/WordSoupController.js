const WordSoupService = require("../services/WordSoupService");

class WordSoupController {
    async findAll(req, res) {
        try {
            const wordSoup = await WordSoupService.findAll();
            return res.status(200).json(wordSoup);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async findById(req, res) {
        try {
            const wordSoup = await WordSoupService.findById(req.params.id);
            return res.status(200).json(wordSoup);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async create(req, res) {
        try {
            const wordSoup = await WordSoupService.create(req.body);
            return res.status(200).json(wordSoup);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async update(req, res) {
        try {
            const wordSoup = await WordSoupService.update(req.params.id, req.body);
            return res.status(200).json(wordSoup);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async delete(req, res) {
        try {
            const wordSoup = await WordSoupService.delete(req.params.id);
            return res.status(200).json(wordSoup);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new WordSoupController();