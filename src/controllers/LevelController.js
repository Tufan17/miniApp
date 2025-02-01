const LevelService = require("../services/LevelService");
const ContentService = require("../services/ContentService");
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
            const existKey = await LevelService.findOne({key:req.body.key});
            if(existKey){
                return res.status(200).json({status:false,message:"Bu Sıralamada Zaten Bir Kayıt Bulunmaktadır"});
            }
            const level = await LevelService.create(req.body);
            return res.status(200).json({status:true,message:"Sıralama Başarıyla Oluşturuldu",level});
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
            const existContent = await ContentService.findOne({levelId:req.params.id});
            if(existContent){
                return res.status(200).json({status:false,message:"Bu Sıralamaya Ait İçerik Bulunmaktadır"});
            }
            const level = await LevelService.deleteById(req.params.id);
            return res.status(200).json({status:true,message:"Sıralama Başarıyla Silindi",level});
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async levelContent(req, res) {
       try {
        const id = req.params.id;

        const level = await LevelService.content(id);

        return res.status(200).json(level);
       } catch (error) {
        return res.status(500).json({ error: error.message });
       }
    }
}

module.exports = new LevelController();