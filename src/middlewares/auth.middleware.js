const jwtConfig = require('../config/jwt.config');

const authenticateToken = (req, res, next) => {
  // Obter o token do cabeçalho de autorização
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({ message: 'Token de autenticação não fornecido' });
  }
  
  // Verificar o token
  const { valid, decoded, error } = jwtConfig.verifyToken(token);
  
  if (!valid) {
    return res.status(403).json({ message: 'Token inválido ou expirado', error });
  }
  
  // Adicionar o ID do usuário ao objeto de requisição
  req.userId = decoded.id;
  
  next();
};

module.exports = {
  authenticateToken
};