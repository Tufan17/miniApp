const Joi = require("joi");

const createValidation = Joi.object({
    key: Joi.number().required(),
    name: Joi.string().required(),
});

const updateValidation = Joi.object({
    key: Joi.number().optional(),
    name: Joi.string().optional(),
});

module.exports = { createValidation, updateValidation };