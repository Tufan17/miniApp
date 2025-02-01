const Joi = require("joi");

const createValidation = Joi.object({
    levelId: Joi.string().required(),
    point: Joi.number().required(),
});

const updateValidation = Joi.object({
    levelId: Joi.string().optional(),
    point: Joi.number().optional(),
});

module.exports = { createValidation, updateValidation };