const BaseService = require('./BaseService');
const Model = require('../models/UserLevelModel');
class UserLevelService extends BaseService {
  constructor() {
    super(Model);
  }
}

module.exports = new UserLevelService();