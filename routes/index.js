const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /api:
 *   get:
 *     summary: Welcome route
 *     description: Returns a greeting message
 *     responses:
 *       200:
 *         description: A successful response
 */
router.get("/", (req, res) => {
  res.send("hello world");
});

// Sub-route for /api/contacts
router.use("/contacts", require("./contacts"));

module.exports = router;
