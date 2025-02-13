const Joi = require("joi");

const createValidation = Joi.object({
    nickname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    avatar: Joi.string().optional(),
    role: Joi.string().required(),
});

const updateValidation = Joi.object({
    nickname: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().optional(),
    avatar: Joi.string().optional(),
    role: Joi.string().optional(),
});

module.exports = { createValidation, updateValidation };