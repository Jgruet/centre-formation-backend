var express = require('express');
var router = express.Router();
var formationsDAO = require('../models/formationsDAO');

/* GET users listing. */
router.get('/', async (req, res) => {
    let result = await formationsDAO.findAll();
    console.log(result);
});

module.exports = router;
