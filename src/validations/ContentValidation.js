const Joi = require("joi");

const createValidation = Joi.object({
    name: Joi.string().required(),
    levelId: Joi.string().required(),
    description: Joi.string().optional(),
});

const updateValidation = Joi.object({
    name: Joi.string().optional(),
    levelId: Joi.string().optional(),
    description: Joi.string().optional(),
});

module.exports = { createValidation, updateValidation };