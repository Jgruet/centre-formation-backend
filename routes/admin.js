var express = require('express');
var router = express.Router();
const { verifyToken, isAdmin } = require('../middlewares/authJwt');
const formationDAO = require('../models/formationsDAO');


router.use(verifyToken);
router.use(isAdmin);

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


module.exports = router;