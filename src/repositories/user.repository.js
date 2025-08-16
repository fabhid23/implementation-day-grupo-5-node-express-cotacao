const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const usersFilePath = path.join(__dirname, '../data/users.json');

const readUsers = () => {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler arquivo de usuários:', error);
    return [];
  }
};

const writeUsers = (users) => {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Erro ao escrever arquivo de usuários:', error);
    return false;
  }
};

const findByUsername = (username) => {
  const users = readUsers();
  return users.find(user => user.username === username);
};

const findById = (id) => {
  const users = readUsers();
  return users.find(user => user.id === id);
};

const create = async (userData) => {
  const users = readUsers();
  
  // Verificar se o usuário já existe
  if (users.some(user => user.username === userData.username)) {
    throw new Error('Usuário já existe');
  }
  
  // Gerar ID
  const id = (users.length + 1).toString();
  
  // Hash da senha
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  
  const newUser = {
    id,
    ...userData,
    password: hashedPassword
  };
  
  users.push(newUser);
  writeUsers(users);
  
  // Retornar usuário sem a senha
  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

const validatePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = {
  findByUsername,
  findById,
  create,
  validatePassword
};