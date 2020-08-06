var express = require('express');
var router = express.Router();
var utilisateursDAO = require('../models/utilisateursDAO');

/* GET users listing. */
router.get('/', async (req, res) => {
    let result = await utilisateursDAO.findOneBy('roleId', 2);
    console.log(result);
});

router.post('/', async (req, res) => {
    const user = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        roleId: 3,
        mail: req.body.mail,
        mdp: req.body.mdp
    }
    let result = await utilisateursDAO.insertOne(user);
    console.log(result);
})

module.exports = router;
