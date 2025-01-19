const Joi = require("joi");

const createValidation = Joi.object({
    word: Joi.string().required(),
    description: Joi.string().required(),
    level: Joi.string().required(),
});

const updateValidation = Joi.object({
    word: Joi.string().optional(),
    description: Joi.string().optional(),
    level: Joi.string().optional(),
});

module.exports = { createValidation, updateValidation };