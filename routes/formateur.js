var express = require('express');
var router = express.Router();
const { verifyToken, isAdmin } = require('../middlewares/authJwt');
const coursDAO = require('../models/coursDAO');

router.use((req, res, next) => {
    verifyToken(req, res, next);
    isModeratorOrAdmin(req, res, next);
    next();
});
/*
router.get('/cours/', (req, res) => {
    res.send('ok vous êtes admin ou formateur');
});
*/


// Création d'une formation
router.post('/cours/new', async (req, res) => {
    const newCours = {
        sujet: req.body.sujet,
        formationId: req.body.formationId,
        formateurId: req.body.formateurId,
        date_debut: req.body.date_debut,
        date_fin: req.body.date_fin,
        duree: req.body.duree
    };
    try {
        const result = await coursDAO.insertOne(newCours);
        console.log(result);
        res.send(result);
    } catch(err){
        console.log(err);
    }
    


});


module.exports = router;