const BaseService = require('./BaseService');
const Model = require('../models/CEFRModel');
class CEFRServices extends BaseService {
  constructor() {
    super(Model);
  }
 
}

module.exports = new CEFRServices();