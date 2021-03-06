var express = require('express');
var router = express.Router();
var utilisateursDAO = require('../models/utilisateursDAO');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const config = require("../config/auth.config");

/* GET users listing. */
router.get('/formateurs', async (req, res) => {
    let result = JSON.parse(JSON.stringify(await utilisateursDAO.findAllBy('roleId', 2)));
    res.send(result);
});

// route login

router.post('/connexion', async (req, res) => {
        let passCheck = false;
        const user = await utilisateursDAO.findUserByEmail(req.body.mail);
    try {
        if (user && 'mdp' in user) {
            passCheck = await bcrypt.compare(req.body.mdp, user.mdp);
            if (passCheck) {
                const token = jwt.sign({id: user.id}, config.secret, {
                    expiresIn: 86400
                });
                const role = await utilisateursDAO.getRole(user.roleId)
                console.log('Vous êtes connecté');
                console.log(role)

                // throw {error: "loggedIn"};
                res.status(200).send({
                    id: user.id,
                    nom: user.nom,
                    prenom: user.prenom,
                    mail: user.mail,
                    role: role,
                    accessToken: token
                })

            } else {
                res.send({error: 'loginFailed'})
            }
        } else {
            res.send({error: 'loginFailed'})
        }
    }catch (err){
        console.log(err);
        res.send(err);
    }

    }
);

// route inscription
router.post('/inscription', async (req, res) => {

    const test = req.body.mail.match(/^[a-z0-9_\-\.]+@[a-z0-9_\-\.]+\.[a-z]+$/i);
    const test2 = req.body.mdp.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-!"§$%&/()=?+*~#'_:.,;]).{8,}$/);
    //const checkEmail = await utilisateursDAO.checkEmail(req.body.mail);
    try {
        if (test && test2 /*&& checkEmail == undefined*/) {
            console.log(req.body.mdp)
            const hash = await bcrypt.hash(req.body.mdp, 2);
            console.log(hash)
            const user = {
                nom: req.body.nom,
                prenom: req.body.prenom,
                roleId: 3,
                mail: req.body.mail,
                mdp: hash
            }
            let result = await utilisateursDAO.insertOne(user);
            console.log(result.affectedRows);
            // si === 1, l'insertion est un succès
            console.log('ok vous êtes inscrit');
            throw {error: "registered"};

        } else {
            throw {error: "pwdFail"};
            res.send('test');
        }
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});


module.exports = router;
