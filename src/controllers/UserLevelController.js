const UserLevelService = require("../services/UserLevelService");
const LevelService = require("../services/LevelService");

class UserLevelController {
    static async findAll(req, res) {
       try {
        const userId = req.user.id;
        const cefrId = req.query.cefrId;
        const levels = await LevelService.userLevel(userId,cefrId);

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

      
        const existUserLevel = await UserLevelService.findOne({userId,levelId});
        
        if(existUserLevel){
            const userLevel = await UserLevelService.update(existUserLevel._id,{
                    userId,
                    levelId,
                    point:point>existUserLevel.point?point:existUserLevel.point,
                    maxPoint
            });
            return res.status(200).json({status:true,userLevel});
        }
        const body={
            userId,
            levelId,
            point,
            maxPoint
        };
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

    static async leadboard(req, res) {
        const userLevels = await UserLevelService.findAll({},"","levelId userId");

        let leadboard = [];
        let setLeadboard = {};

        userLevels.forEach(userLevel => {
            const userId = userLevel.userId._id.toString();
            if(!setLeadboard[userId]){
                setLeadboard[userId] = true;
                leadboard.push({
                    _id: userId,
                    point: userLevel.point,
                    nickname: userLevel.userId.nickname,
                    avatar: userLevel.userId.avatar ?? null
                });
            } else {
                const existingUser = leadboard.find(user => user._id === userId);
                if (existingUser) {
                    existingUser.point += userLevel.point;
                }
            }
        });

     
        leadboard.sort((a,b) => b.point - a.point);

        res.status(200).json(leadboard);
    }

}



module.exports = UserLevelController;

