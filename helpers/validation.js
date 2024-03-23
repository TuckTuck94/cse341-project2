const Joi = require("joi");

const blogSchema = Joi.object().keys({
  firstName: Joi.string()
    .uppercase()
    .trim()
    .required()
    .min(2)
    .regex(/^([a-zA-Z][^0-9]*)$/)
    .label("First Name")
    .messages({
      "string.min": '"First Name" must be a string with at least 2 characters.',
      "string.pattern.base": '"First Name" cannot have numbers.',
    }),
  lastName: Joi.string()
    .uppercase()
    .trim()
    .required()
    .min(2)
    .regex(/^([a-zA-Z][^0-9]*)$/)
    .label("Last Name")
    .messages({
      "string.min": '"Last Name" must be a string with at least 2 characters.',
      "string.pattern.base": '"Last Name" cannot have numbers.',
    }),
  email: Joi.string().email().lowercase().trim().min(7).required(),
  studentID: Joi.number().min(5).required(),
  birthday: Joi.date().max("now").required(),
});

module.exports = { blogSchema };
