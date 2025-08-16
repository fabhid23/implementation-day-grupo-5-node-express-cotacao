const bcrypt = require('bcryptjs');

/**
 * Gera um hash para a senha fornecida
 * @param {string} password - Senha em texto plano
 * @returns {Promise<string>} - Hash da senha
 */
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

/**
 * Verifica se a senha em texto plano corresponde ao hash
 * @param {string} password - Senha em texto plano
 * @param {string} hash - Hash da senha
 * @returns {Promise<boolean>} - Verdadeiro se a senha corresponder ao hash
 */
const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports = {
  hashPassword,
  comparePassword
};