const Joi = require("joi");

const createValidation = Joi.object({
    name: Joi.string().required(),
    key: Joi.number().required(),
    cefrId: Joi.string().required(),
    matrisCount: Joi.number().required(),
});

const updateValidation = Joi.object({
    name: Joi.string().optional(),
    key: Joi.number().optional(),
    cefrId: Joi.string().optional(),
    matrisCount: Joi.number().optional(),
});

module.exports = { createValidation, updateValidation };