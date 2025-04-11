const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API for managing books
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get a list of books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   author:
 *                     type: string
 *                   publishedYear:
 *                     type: number
 *                   genre:
 *                     type: string
 *                   summary:
 *                     type: string
 */
router.get("/", bookController.getBooks);

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               publishedYear:
 *                 type: number
 *               genre:
 *                 type: string
 *               summary:
 *                 type: string
 *     responses:
 *       201:
 *         description: Book created
 */
router.post("/", bookController.createBook);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the book to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               publishedYear:
 *                 type: number
 *               genre:
 *                 type: string
 *               summary:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book updated
 *       404:
 *         description: Book not found
 */
router.put("/:id", bookController.updateBook);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the book to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted
 *       404:
 *         description: Book not found
 */
router.delete("/:id", bookController.deleteBook);

module.exports = router;
