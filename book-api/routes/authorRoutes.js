const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");

/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: API for managing authors
 */

/**
 * @swagger
 * /api/authors:
 *   get:
 *     summary: Get all authors
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: A list of authors
 */
router.get("/", authorController.getAuthors);

/**
 * @swagger
 * /api/authors:
 *   post:
 *     summary: Create an author
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Author created
 */
router.post("/", authorController.createAuthor);

/**
 * @swagger
 * /api/authors/{id}:
 *   put:
 *     summary: Update an author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Author ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Author updated successfully
 *       404:
 *         description: Author not found
 */
router.put("/:id", authorController.updateAuthor);

/**
 * @swagger
 * /api/authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Author ID
 *     responses:
 *       200:
 *         description: Author deleted successfully
 *       404:
 *         description: Author not found
 */
router.delete("/:id", authorController.deleteAuthor);

module.exports = router;
