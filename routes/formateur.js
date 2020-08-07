var express = require('express');
var router = express.Router();
const { verifyToken, isModeratorOrAdmin } = require('../middlewares/authJwt');
const coursDAO = require('../models/coursDAO');

router.use(verifyToken);
router.use(isModeratorOrAdmin);


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