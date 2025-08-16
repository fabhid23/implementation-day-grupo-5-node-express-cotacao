const userRepository = require('../repositories/user.repository');
const jwtConfig = require('../config/jwt.config');

const login = async (username, password) => {
  // Buscar usuário pelo username
  const user = userRepository.findByUsername(username);
  
  if (!user) {
    throw new Error('Usuário não encontrado');
  }
  
  // Validar senha
  const isPasswordValid = await userRepository.validatePassword(password, user.password);
  
  if (!isPasswordValid) {
    throw new Error('Senha inválida');
  }
  
  // Gerar token JWT
  const token = jwtConfig.generateToken(user.id);
  
  return {
    user: {
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email
    },
    token
  };
};

const register = async (userData) => {
  return await userRepository.create(userData);
};

const getUserById = (userId) => {
  const user = userRepository.findById(userId);
  
  if (!user) {
    throw new Error('Usuário não encontrado');
  }
  
  // Retornar usuário sem a senha
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

module.exports = {
  login,
  register,
  getUserById
};