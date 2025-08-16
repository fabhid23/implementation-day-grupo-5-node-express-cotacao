const Joi = require('joi');

const userSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  cpf: Joi.string().length(11).pattern(/^[0-9]+$/).required(),
  birthDate: Joi.date().iso().required()
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

module.exports = {
  userSchema,
  loginSchema
};