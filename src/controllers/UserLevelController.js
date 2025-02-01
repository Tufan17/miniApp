const UserLevelService = require("../services/UserLevelService");
const LevelService = require("../services/LevelService");

class UserLevelController {
    static async findAll(req, res) {
       try {
        const userId = req.user.id;
        const levels = await LevelService.userLevel(userId);

        res.status(200).json(levels);
       } catch (error) {
        res.status(404).json({status:false,message: "User level not found"});
       }
    }
    static async findById(req, res) {
        try {
            const userLevel = await UserLevelService.findById(req.params.id,"","levelId");
            res.status(200).json(userLevel);
        } catch (error) {
            res.status(404).json({status:false,message: "User level not found"});
        }
    }

    static async create(req, res) {
        const userId = req.user.id;
        const {levelId, point} = req.body;
        const level = await LevelService.content(levelId);
        if(!level) {
            return res.status(404).json({status:false,message: "Level not found"});
        }else if(!level?.contents?.length){
            return res.status(400).json({status:false,message: "Level has contents"});
        }
        const maxPoint = UserLevelController.maxPointCalculate(level);

        const body={
            userId,
            levelId,
            point,
            maxPoint
        };
        const existUserLevel = await UserLevelService.findOne({userId,levelId});
        if(existUserLevel){
            const userLevel = await UserLevelService.update(existUserLevel._id,body);
            return res.status(200).json({status:true,userLevel});
        }
        const userLevel = await UserLevelService.create(body);
        return res.status(200).json({status:true,userLevel});
    }
   
     
    static maxPointCalculate(level) {
        let maxPoint = 0;
        for(const content of level.contents) {
            maxPoint += content.name.split(" ").length*10;
        }
        return maxPoint;
    }


}



module.exports = UserLevelController;
