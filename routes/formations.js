var express = require('express');
var router = express.Router();
var formationsDAO = require('../models/formationsDAO');

/* GET all formations. */
router.get('/', async (req, res) => {
    let result = JSON.parse(JSON.stringify( await formationsDAO.findAll())) ;
    res.send(result);
});

/* GET one formation for details. */
router.get('/:id([0-9]+)', async (req, res) => {
    let result = JSON.parse(JSON.stringify(await formationsDAO.findOneById(req.params.id)));
    console.log(result);
});

module.exports = router;
