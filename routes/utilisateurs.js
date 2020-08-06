var express = require('express');
var router = express.Router();
var utilisateursDAO = require('../models/utilisateursDAO');
const bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', async (req, res) => {
    let result = JSON.parse(JSON.stringify(await utilisateursDAO.findOneBy('roleId', 2)));
    res.send(result);
});

router.post('/', async (req, res) => {

    const test = req.body.mail.match(/^[a-z0-9_\-\.]+@[a-z0-9_\-\.]+\.[a-z]+$/i);
    const test2 = req.body.mdp.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-!"§$%&/()=?+*~#'_:.,;]).{8,}$/);
    const checkEmail = await utilisateursDAO.checkEmail(req.body.mail);
    try {
        if (test && test2 && checkEmail == undefined) {
            const hash = await bcrypt.hash(req.body.mdp, 2);
            const user = {
                nom: req.body.nom,
                prenom: req.body.prenom,
                roleId: 3,
                mail: hash,
                mdp: req.body.mdp
            }
            let result = await utilisateursDAO.insertOne(user);
            console.log(result.affectedRows);
            // si === 1, l'insertion est un succès
            console.log('ok vous êtes inscrit');
            //res.send(result.affectedRows);

        }
    } catch (err) {
        console.log(err);
    }



})

module.exports = router;
