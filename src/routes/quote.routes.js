const express = require('express');
const quoteController = require('../controllers/quote.controller');
const { validateRequest } = require('../middlewares/validation.middleware');
const { authenticateToken } = require('../middlewares/auth.middleware');
const { quoteSchema } = require('../models/quote.model');

const router = express.Router();

/**
 * @swagger
 * /api/quotes:
 *   post:
 *     summary: Criar nova cotação de seguro
 *     tags: [Cotações]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - cpf
 *               - birthDate
 *               - address
 *               - financingData
 *             properties:
 *               name:
 *                 type: string
 *               cpf:
 *                 type: string
 *               birthDate:
 *                 type: string
 *                 format: date
 *               address:
 *                 type: object
 *                 properties:
 *                   street:
 *                     type: string
 *                   neighborhood:
 *                     type: string
 *                   zipCode:
 *                     type: string
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *                   country:
 *                     type: string
 *               financingData:
 *                 type: object
 *                 properties:
 *                   term:
 *                     type: integer
 *                     minimum: 12
 *                     maximum: 60
 *                   amount:
 *                     type: number
 *                     minimum: 25000
 *                     maximum: 200000
 *                   contractDate:
 *                     type: string
 *                     format: date
 *     responses:
 *       201:
 *         description: Cotação criada com sucesso
 *       400:
 *         description: Erro de validação ou regras de negócio
 *       401:
 *         description: Não autenticado
 */
router.post('/', authenticateToken, validateRequest(quoteSchema), quoteController.createQuote);

/**
 * @swagger
 * /api/quotes:
 *   get:
 *     summary: Listar cotações do usuário autenticado
 *     tags: [Cotações]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de cotações
 *       401:
 *         description: Não autenticado
 */
router.get('/', authenticateToken, quoteController.getQuotes);

/**
 * @swagger
 * /api/quotes/all:
 *   get:
 *     summary: Listar todas as cotações (admin)
 *     tags: [Cotações]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todas as cotações
 *       401:
 *         description: Não autenticado
 */
router.get('/all', authenticateToken, quoteController.getAllQuotes);

/**
 * @swagger
 * /api/quotes/{id}:
 *   get:
 *     summary: Obter cotação por ID
 *     tags: [Cotações]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalhes da cotação
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Cotação não encontrada
 */
router.get('/:id', authenticateToken, quoteController.getQuoteById);

module.exports = router;