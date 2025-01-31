const ContentService = require("../services/ContentService");
const LevelService = require("../services/LevelService");
class ContentController {
    async findAll(req, res) {
        try {
            const content = await ContentService.findAll({},"","levelId",{createdAt:-1});
            return res.status(200).json(content);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async findById(req, res) {
        try {
            const content = await ContentService.findById(req.params.id);
            return res.status(200).json(content);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async create(req, res) {
        try {
            const existLevel = await LevelService.findOne({_id:req.body.levelId});
            if(!existLevel){
                return res.status(200).json({status:false,message:"Seviye Bulunamadı"});
            }
            const existContent = await ContentService.findOne({name:req.body.name});
            if(existContent){
                return res.status(200).json({status:false,message:"İçerik Zaten Var"});
            }
            const content = await ContentService.create(req.body);
            return res.status(200).json({status:true,message:"İçerik Başarıyla Oluşturuldu",content});
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async update(req, res) {
        try {
            const existLevel = await LevelService.findById(req.body.levelId);
            if(!existLevel){
                return res.status(200).json({status:false,message:"Seviye Bulunamadı"});
            }
            const content = await ContentService.update(req.params.id, req.body);
            return res.status(200).json(content);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async delete(req, res) {
        try {
            const content = await ContentService.deleteById(req.params.id);
            return res.status(200).json({status:true,message:"İçerik Başarıyla Silindi",content});
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ContentController();