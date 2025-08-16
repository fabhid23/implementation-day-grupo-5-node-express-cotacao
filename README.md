# API de Cotação de Seguro para Financiamento Pessoal

API REST desenvolvida em Node.js com Express para realizar cotações de seguro para financiamento pessoal.

## Funcionalidades

- Autenticação de usuários (login/registro) com JWT
- Cotação de seguro seguindo regras de negócio específicas
- Listagem de cotações criadas
- Validação de CEP via API dos Correios (ViaCEP)
- Documentação via Swagger

## Regras de Negócio

1. O sistema permite cotação apenas para pessoas com idade entre 18 e 65 anos
2. O valor do seguro é 5% do valor financiado
3. A quantidade de parcelas do financiamento deve ser entre 12 e 60
4. O segurado deve ser residente do Brasil (validação via serviço ViaCEP)
5. O valor financiado deve ser no mínimo de R$ 25.000,00 e o máximo de R$ 200.000,00
6. O segurado pode ter ativado somente 3 seguros
7. O sistema valida os dados do segurado (Nome, CPF, Data de Nascimento, Endereço, Dados do Financiamento)

## Tecnologias Utilizadas

- Node.js
- Express
- JWT para autenticação
- Joi para validação de dados
- Swagger para documentação da API
- Axios para requisições HTTP
- Bcrypt para criptografia de senhas

## Estrutura do Projeto

O projeto segue a arquitetura MVC (Model-View-Controller):

- **Models**: Definição dos esquemas de dados e validações
- **Controllers**: Manipulação das requisições e respostas
- **Services**: Lógica de negócio
- **Repositories**: Acesso aos dados (arquivos JSON)
- **Routes**: Definição das rotas da API
- **Middlewares**: Autenticação e validação
- **Config**: Configurações do JWT e outras
- **Data**: Armazenamento dos dados em arquivos JSON

## Instalação e Execução

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/implementation-day-grupo-5-node-express-cotacao.git

# Entrar no diretório do projeto
cd implementation-day-grupo-5-node-express-cotacao

# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Executar em modo de produção
npm start
```

## Documentação da API

A documentação da API está disponível através do Swagger UI em:

```
http://localhost:3000/api-docs
```

## Usuário Padrão

A API já vem com um usuário padrão para testes:

- **Username**: admin
- **Password**: admin123

## Endpoints Principais

### Autenticação

- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/register` - Registro de novo usuário
- `GET /api/auth/profile` - Obter perfil do usuário autenticado

### Cotações

- `POST /api/quotes` - Criar nova cotação
- `GET /api/quotes` - Listar cotações do usuário autenticado
- `GET /api/quotes/all` - Listar todas as cotações
- `GET /api/quotes/:id` - Obter cotação por ID