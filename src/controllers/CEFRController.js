const CEFRServices = require("../services/CEFRServices");
const LevelService = require("../services/LevelService");
class CEFRController {
    async findAll(req, res) {
        try {
            const cefrs = await CEFRServices.findAll();
            return res.status(200).json(cefrs);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async findById(req, res) {
        try {
            const cefr = await CEFRServices.findById(req.params.id);
            return res.status(200).json(cefr);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async findAllLevel(req, res) {
        try {
            const cefrs = await LevelService.findAll({cefrId:req.params.id},"_id name");
            return res.status(200).json(cefrs);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async create(req, res) {
        try {
            const {name,key} = req.body;
            const existCefr = await CEFRServices.findOne({name});
            const existCefrKey = await CEFRServices.findOne({key});
            if(existCefr){
                return res.status(400).json({ error: "CEFR already exists" });
            }
            if(existCefrKey){
                return res.status(400).json({ error: "CEFR key already exists" });
            }
            const cefr = await CEFRServices.create({name,key});
            return res.status(200).json({status:true,message:"CEFR created successfully",data:cefr});
        } catch (error) {
            return res.status(500).json({ status: false, message: error.message });
        }
    }
    
    async update(req, res) {
        try {
            const cefr = await CEFRServices.update(req.params.id, req.body);
            return res.status(200).json({status:true,message:"CEFR updated successfully",data:cefr});
        } catch (error) {
            return res.status(500).json({ status: false, message: error.message });
        }
    }

    async delete(req, res) {
        try {
            const cefr = await CEFRServices.deleteOne({_id:req.params.id});
            return res.status(200).json({status:true,message:"CEFR deleted successfully",data:cefr});
        } catch (error) {
            return res.status(500).json({ status: false, message: error.message });
        }
    }
}

module.exports = new CEFRController();