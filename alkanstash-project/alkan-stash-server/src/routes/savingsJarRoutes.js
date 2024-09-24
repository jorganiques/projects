const express = require('express');
const router = express.Router();
const savingsJarController = require('../controllers/savingsJarController');

/**
 * @swagger
 * /jars:
 *   post:
 *     summary: Create a new savings jar
 *     tags: [Savings Jars]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jarName:
 *                 type: string
 *               targetAmount:
 *                 type: number
 *               userId:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Savings jar created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', savingsJarController.createSavingsJar);

/**
 * @swagger
 * /jars/{userId}:
 *   get:
 *     summary: Get all jars by userId
 *     tags: [Savings Jars]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The userId of the user
 *     responses:
 *       200:
 *         description: Jars retrieved successfully
 *       404:
 *         description: Jars not found
 */
router.get('/:userId', savingsJarController.getJarsByUserId);

/**
 * @swagger
 * /jars/{userId}/{jarId}:
 *   get:
 *     summary: Get a specific jar by userId and jarId
 *     tags: [Savings Jars]
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
 *         description: Jar retrieved successfully
 *       404:
 *         description: Jar not found
 */
router.get('/:userId/:jarId', savingsJarController.getJarByUserAndJar);

/**
 * @swagger
 * /jars/{userId}/{jarId}:
 *   delete:
 *     summary: Mark a jar as deleted
 *     tags: [Savings Jars]
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
 *         description: Jar deleted successfully
 *       404:
 *         description: Jar not found
 */
router.delete('/:userId/:jarId', savingsJarController.deleteJar);

/**
 * @swagger
 * /jars/{userId}/{jarId}:
 *   put:
 *     summary: Update a savings jar
 *     tags: [Savings Jars]
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jarName:
 *                 type: string
 *               targetAmount:
 *                 type: number
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Jar updated successfully
 *       404:
 *         description: Jar not found
 */
router.put('/:userId/:jarId', savingsJarController.updateJar);

module.exports = router;
