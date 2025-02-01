const Joi = require("joi");

const registerValidation = Joi.object({
    nickname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    deviceId: Joi.string().required(),
    avatar: Joi.string().optional(),
});

const loginNicknameValidation = Joi.object({
    nickname: Joi.string().required(),
    password: Joi.string().required(),
    rememberMe: Joi.boolean().optional(),
    deviceId: Joi.string().optional(),
});

const loginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    rememberMe: Joi.boolean().optional().default(false),
    deviceId: Joi.string().optional(),
});

module.exports = { registerValidation, loginValidation, loginNicknameValidation };