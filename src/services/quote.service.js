const axios = require('axios');
const quoteRepository = require('../repositories/quote.repository');
const userRepository = require('../repositories/user.repository');

const calculateAge = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

const validateCEP = async (cep) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    
    if (response.data.erro) {
      throw new Error('CEP inválido');
    }
    
    return response.data;
  } catch (error) {
    throw new Error('Erro ao validar CEP: ' + (error.response?.data?.message || error.message));
  }
};

const createQuote = async (quoteData) => {
  // Verificar se o usuário existe
  const user = userRepository.findById(quoteData.userId);
  if (!user) {
    throw new Error('Usuário não encontrado');
  }
  
  // Verificar idade do segurado (entre 18 e 65 anos)
  const age = calculateAge(quoteData.birthDate);
  if (age < 18 || age > 65) {
    throw new Error('Idade do segurado deve estar entre 18 e 65 anos');
  }
  
  // Verificar valor do financiamento (entre 25.000,00 e 200.000,00)
  if (quoteData.financingData.amount < 25000 || quoteData.financingData.amount > 200000) {
    throw new Error('Valor do financiamento deve estar entre R$ 25.000,00 e R$ 200.000,00');
  }
  
  // Verificar prazo do financiamento (entre 12 e 60 meses)
  if (quoteData.financingData.term < 12 || quoteData.financingData.term > 60) {
    throw new Error('Prazo do financiamento deve estar entre 12 e 60 meses');
  }
  
  // Verificar se o segurado é residente do Brasil
  if (quoteData.address.country !== 'Brasil') {
    throw new Error('O segurado deve ser residente do Brasil');
  }
  
  // Validar CEP
  await validateCEP(quoteData.address.zipCode);
  
  // Verificar limite de seguros por usuário (máximo 3)
  const userQuotesCount = quoteRepository.countByUserId(quoteData.userId);
  if (userQuotesCount >= 3) {
    throw new Error('O segurado pode ter no máximo 3 seguros ativos');
  }
  
  // Calcular valor do seguro (5% do valor financiado)
  const insuranceAmount = quoteData.financingData.amount * 0.05;
  
  // Criar cotação
  const quote = quoteRepository.create({
    ...quoteData,
    insuranceAmount
  });
  
  return quote;
};

const getQuotesByUserId = (userId) => {
  return quoteRepository.findByUserId(userId);
};

const getAllQuotes = () => {
  return quoteRepository.findAll();
};

const getQuoteById = (id) => {
  const quote = quoteRepository.findById(id);
  
  if (!quote) {
    throw new Error('Cotação não encontrada');
  }
  
  return quote;
};

module.exports = {
  createQuote,
  getQuotesByUserId,
  getAllQuotes,
  getQuoteById
};