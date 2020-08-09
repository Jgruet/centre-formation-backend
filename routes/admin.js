var express = require('express');
var router = express.Router();
const { verifyToken, isAdmin } = require('../middlewares/authJwt');
const utilisateursDAO = require('../models/utilisateursDAO');


// router.use(verifyToken);
// router.use(isAdmin);

router.get('/formations/new', (req, res) => {
    res.send('ok vous êtes admin');
});


// Création d'une formation
router.post('/formations/new', async (req, res) => {
    const newFormation = {
        titre: req.body.titre,
        duree: req.body.duree,
        date_debut: req.body.date_debut,
        date_fin: req.body.date_fin,
        description: req.body.description,
        lieu: req.body.lieu,
        type: req.body.type
    };
    try {
        const result = await formationDAO.insertOne(newFormation);
        console.log(result);
        res.send(result);
    } catch(err){
        console.log(err);
    }

});

// Ajout d'un formateur par l'admin
router.post('/formateur/new', async (req, res) => {
    const test = req.body.mail.match(/^[a-z0-9_\-\.]+@[a-z0-9_\-\.]+\.[a-z]+$/i);
    const test2 = req.body.mdp.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-!"§$%&/()=?+*~#'_:.,;]).{8,}$/);
    //const checkEmail = await utilisateursDAO.checkEmail(req.body.mail);
    try {
        if (test && test2 /*&& checkEmail == undefined*/) {
            const hash = await bcrypt.hash(req.body.mdp, 2);
            const user = {
                nom: req.body.nom,
                prenom: req.body.prenom,
                roleId: 2,
                mail: req.body.mail,
                mdp: hash
            }
            let result = await utilisateursDAO.insertOne(user);
            console.log(result.affectedRows);
            // si === 1, l'insertion est un succès
            console.log('ok vous êtes inscrit');
            //res.send(result.affectedRows);

        } else {
            throw 'Erreur';
            res.send('test');
        }
    } catch (err) {
        console.log(err);
        res.send(err);
    }

});


module.exports = router;
