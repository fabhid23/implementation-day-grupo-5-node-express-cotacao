const fs = require('fs');
const path = require('path');

const quotesFilePath = path.join(__dirname, '../data/quotes.json');

const readQuotes = () => {
  try {
    const data = fs.readFileSync(quotesFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler arquivo de cotações:', error);
    return [];
  }
};

const writeQuotes = (quotes) => {
  try {
    fs.writeFileSync(quotesFilePath, JSON.stringify(quotes, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Erro ao escrever arquivo de cotações:', error);
    return false;
  }
};

const findAll = () => {
  return readQuotes();
};

const findByUserId = (userId) => {
  const quotes = readQuotes();
  return quotes.filter(quote => quote.userId === userId);
};

const findById = (id) => {
  const quotes = readQuotes();
  return quotes.find(quote => quote.id === id);
};

const create = (quoteData) => {
  const quotes = readQuotes();
  
  // Gerar ID
  const id = (quotes.length + 1).toString();
  
  const newQuote = {
    id,
    ...quoteData,
    createdAt: new Date().toISOString()
  };
  
  quotes.push(newQuote);
  writeQuotes(quotes);
  
  return newQuote;
};

const countByUserId = (userId) => {
  const quotes = readQuotes();
  return quotes.filter(quote => quote.userId === userId).length;
};

module.exports = {
  findAll,
  findByUserId,
  findById,
  create,
  countByUserId
};