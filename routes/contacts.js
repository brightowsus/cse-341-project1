const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Get all contacts
 *     responses:
 *       200:
 *         description: A list of contacts
 */
router.get('/', contactsController.getAll);

/**
 * @swagger
 * /api/contacts/{id}:
 *   get:
 *     summary: Get a contact by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The contact ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact details
 */
router.get('/:id', contactsController.getSingle);

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Create a new contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact created
 */
router.post('/', contactsController.createUser);

/**
 * @swagger
 * /api/contacts/{id}:
 *   put:
 *     summary: Update a contact
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact updated
 */
router.put('/:id', contactsController.updateUser);

/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     summary: Delete a contact
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact deleted
 */
router.delete('/:id', contactsController.deleteUser);

module.exports = router;
