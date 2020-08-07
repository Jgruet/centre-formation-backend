var express = require('express');
var router = express.Router();
const { verifyToken, isAuthentificated } = require('../middlewares/authJwt');
const inscriptionDAO = require('../models/inscriptionDAO');

router.use(verifyToken);
router.use(isAuthentificated);

// route inscription à une formation

router.post('/formations/inscription', async (req, res) => {
    const formationRegister = {
        etudiantId: req.body.etudiantId,
        formationId: req.body.formationId
    };
    try {
        const result = await inscriptionDAO.insertOne(formationRegister);
        console.log(result);
        res.send(result);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
