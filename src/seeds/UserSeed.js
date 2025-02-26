const User = require("../models/UserModel.js");
const { v4: uuidv4 } = require('uuid');
const RoleService = require('../services/RoleService');
const HashPassword = require("../utils/hashPassword");
const UserSeed = async () => {
    try {
        await User.deleteMany();
        const role = await RoleService.findAll();
        const adminRole = role.find(item => item.name === 'admin');
        const userRole = role.find(item => item.name === 'user');

        const roles = [
            {
                
                nickname:'admin',
                email:'admin@admin.com',
                password:HashPassword('admin2025'),
                deviceId:uuidv4(),
                avatar:null,
                status:true,
                roleId:adminRole._id,
                deleteAt:null,
                createdAt:Date.now(),
                updatedAt:Date.now(),
              },
              {
               
                nickname: 'user',
                email: 'user@user.com',
                password: HashPassword('user2025'),
                deviceId:uuidv4(),
                avatar:null,
                status:true,
                roleId:userRole._id,
                deleteAt:null,
                createdAt:Date.now(),
                updatedAt:Date.now(),
              }
        ]

        await User.insertMany(roles);
    } catch (error) {
        console.error(error);
    }
};

module.exports = UserSeed;