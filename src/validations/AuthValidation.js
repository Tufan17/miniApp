const Joi = require("joi");

const registerValidation = Joi.object({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    deviceId: Joi.string().required(),
    avatar: Joi.string().optional(),
});

const loginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    deviceId: Joi.string().required(),
    rememberMe: Joi.boolean().optional().default(false),
});

module.exports = { registerValidation, loginValidation };