const BaseService = require('./BaseService');
const Model = require('../models/WordSoupModel');
class WordSoupService extends BaseService {
  constructor() {
    super(Model);
  }
}

module.exports = new WordSoupService();