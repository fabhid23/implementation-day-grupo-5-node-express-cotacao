const userService = require('../services/user.service');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await userService.login(username, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const register = async (req, res) => {
  try {
    const userData = req.body;
    const user = await userService.register(userData);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getProfile = (req, res) => {
  try {
    const userId = req.userId; // Obtido do middleware de autenticação
    const user = userService.getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  login,
  register,
  getProfile
};