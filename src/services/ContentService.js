const BaseService = require('./BaseService');
const Model = require('../models/ContentModel');
class ContentService extends BaseService {
  constructor() {
    super(Model);
  }
}

module.exports = new ContentService();