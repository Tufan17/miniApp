const BaseService = require('./BaseService');
const ContentService = require('./ContentService');
const Model = require('../models/LevelModel');
const UserLevelService = require('./UserLevelService');

class LevelService extends BaseService {
  constructor() {
    super(Model);
  }
  async content(levelId) {
    const level = await this.findById(levelId);
    if(!level) {
      return null;
    }
    const contents = await ContentService.findAll({levelId},"_id name");
    const data = {_id:level._id,key:level.key,name:level.name,contents:contents};
    return data;
  }

  async userLevel(userId,cefrId) {

    const query = {deleteAt:false};
    if(cefrId) query.cefrId = cefrId;
    const allLevels = await this.findAll(query,"_id key name");
    const userLevelDetails = await Promise.all(allLevels.map(async (level) => {
      const userLevel = await UserLevelService.findOne({userId,levelId:level._id});
      return { ...level, userLevel };
    }));
    return userLevelDetails;    
  }
}

module.exports = new LevelService();