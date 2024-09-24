const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               jarId:
 *                 type: string
 *               transactionType:
 *                 type: string
 *                 enum: [Deposit, Withdrawal]
 *               amount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', transactionController.createTransaction);

/**
 * @swagger
 * /transactions/{userId}/{jarId}:
 *   get:
 *     summary: Get transactions by userId and jarId
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The userId of the user
 *       - in: path
 *         name: jarId
 *         required: true
 *         schema:
 *           type: string
 *         description: The jarId of the jar
 *     responses:
 *       200:
 *         description: Transactions retrieved successfully
 *       404:
 *         description: Transactions not found
 */
router.get('/:userId/:jarId', transactionController.getTransactionsByUserAndJar);

/**
 * @swagger
 * /transactions/{userId}/{jarId}:
 *   delete:
 *     summary: Mark a transaction as deleted
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The userId of the user
 *       - in: path
 *         name: jarId
 *         required: true
 *         schema:
 *           type: string
 *         description: The jarId of the jar
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *       404:
 *         description: Transaction not found
 */
router.delete('/:userId/:jarId', transactionController.deleteTransaction);

module.exports = router;
