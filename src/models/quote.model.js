const Joi = require('joi');

const addressSchema = Joi.object({
  street: Joi.string().required(),
  neighborhood: Joi.string().required(),
  zipCode: Joi.string().length(8).pattern(/^[0-9]+$/).required(),
  city: Joi.string().required(),
  state: Joi.string().length(2).required(),
  country: Joi.string().required().valid('Brasil')
});

const financingDataSchema = Joi.object({
  term: Joi.number().integer().min(12).max(60).required(),
  amount: Joi.number().min(25000).max(200000).required(),
  contractDate: Joi.date().iso().required()
});

const quoteSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  cpf: Joi.string().length(11).pattern(/^[0-9]+$/).required(),
  birthDate: Joi.date().iso().required(),
  address: addressSchema.required(),
  financingData: financingDataSchema.required()
});

module.exports = {
  quoteSchema
};