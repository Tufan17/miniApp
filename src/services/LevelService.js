const BaseService = require('./BaseService');
const Model = require('../models/LevelModel');
class LevelService extends BaseService {
  constructor() {
    super(Model);
  }
}

module.exports = new LevelService();