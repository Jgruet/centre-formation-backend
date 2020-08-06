var express = require('express');
var router = express.Router();
var formationsDAO = require('../models/formationsDAO');

/* GET all formations. */
router.get('/', async (req, res) => {
    let result = await formationsDAO.findAll();
    console.log(result);
});

/* GET one formation for details. */
router.get('/:id([0-9]+)', async (req, res) => {
    let result = await formationsDAO.findOneById(req.params.id);
    console.log(result);
});

module.exports = router;
