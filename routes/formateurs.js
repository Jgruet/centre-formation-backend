var express = require('express');
var router = express.Router();
var formateursDAO = require('../models/formateursDAO');

/* GET users listing. */
router.get('/', async (req, res) => {
    let result = await formateursDAO.findOneBy('roleId', 2);
    console.log(result);
});

module.exports = router;
