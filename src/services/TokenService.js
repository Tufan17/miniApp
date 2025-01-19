const BaseService = require('./BaseService');  
const Model = require('../models/TokenModel');

class TokenService extends BaseService {
  constructor() {
    super(Model);
  }
  async deleteToken(token){
    const tokenInDb = await this.findOne({token});
    if(!tokenInDb){
      return false;
    }
    return this.deleteById(tokenInDb._id);
  }

}

module.exports = new TokenService();
