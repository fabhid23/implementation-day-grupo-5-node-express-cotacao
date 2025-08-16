const quoteService = require('../services/quote.service');

const createQuote = async (req, res) => {
  try {
    const userId = req.userId; // Obtido do middleware de autenticação
    const quoteData = {
      ...req.body,
      userId
    };
    
    const quote = await quoteService.createQuote(quoteData);
    res.status(201).json(quote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getQuotes = (req, res) => {
  try {
    const userId = req.userId; // Obtido do middleware de autenticação
    const quotes = quoteService.getQuotesByUserId(userId);
    res.status(200).json(quotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllQuotes = (req, res) => {
  try {
    const quotes = quoteService.getAllQuotes();
    res.status(200).json(quotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getQuoteById = (req, res) => {
  try {
    const { id } = req.params;
    const quote = quoteService.getQuoteById(id);
    res.status(200).json(quote);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  createQuote,
  getQuotes,
  getAllQuotes,
  getQuoteById
};