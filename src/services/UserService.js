const BaseService = require('./BaseService');
const Model = require('../models/UserModel');
class UserService extends BaseService {
  constructor() {
    super(Model);
  }
}

module.exports = new UserService();