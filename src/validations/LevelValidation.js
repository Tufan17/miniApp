const Joi = require("joi");

const createValidation = Joi.object({
    name: Joi.string().required(),
    key: Joi.number().required(),
    description: Joi.string().optional(),
});

const updateValidation = Joi.object({
    name: Joi.string().optional(),
    key: Joi.number().optional(),
    description: Joi.string().optional(),
});

module.exports = { createValidation, updateValidation };