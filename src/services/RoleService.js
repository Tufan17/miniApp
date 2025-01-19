const BaseService = require('./BaseService');
const Model = require('../models/RoleModel');
class RoleService extends BaseService {
  constructor() {
    super(Model);
  }
}

module.exports = new RoleService();