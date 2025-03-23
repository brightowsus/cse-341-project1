const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.send('hello world');
});

router.use('/contacts', require("./contacts"));

module.exports = router;
