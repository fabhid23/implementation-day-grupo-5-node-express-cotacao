const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const generateAdminUser = async () => {
  try {
    // Senha em texto plano: admin123
    const plainPassword = 'admin123';
    
    // Gerar hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    
    // Criar usuário admin
    const adminUser = {
      id: '1',
      username: 'admin',
      password: hashedPassword,
      name: 'Administrador',
      email: 'admin@example.com',
      cpf: '12345678900',
      birthDate: '1990-01-01'
    };
    
    // Caminho para o arquivo de usuários
    const usersFilePath = path.join(__dirname, '../data/users.json');
    
    // Verificar se o diretório existe
    const dirPath = path.dirname(usersFilePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    // Escrever no arquivo
    fs.writeFileSync(usersFilePath, JSON.stringify([adminUser], null, 2), 'utf8');
    
    console.log('Usuário admin criado com sucesso!');
    console.log('Username:', adminUser.username);
    console.log('Password (texto plano):', plainPassword);
    console.log('Password (hash):', hashedPassword);
  } catch (error) {
    console.error('Erro ao gerar usuário admin:', error);
  }
};

// Executar a função
generateAdminUser();