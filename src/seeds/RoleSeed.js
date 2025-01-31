const RoleService = require("../services/RoleService");
const mongoose = require("mongoose");

const RoleSeed = async () => {
    try {

        await RoleService.create(  {
            name: 'admin',
            description: 'Administrator'
          });

          await RoleService.create(  {
            name: 'user',
            description: 'User'
          });

    } catch (error) {
        console.error(error);
    }
};

module.exports = RoleSeed;