var express = require('express');
var router = express.Router();
var formationsDAO = require('../models/formationsDAO');
const  authJwt  = require("../middlewares/authJwt");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    /* GET all formations. */
    app.get('/formations', async (req, res) => {
        let result = JSON.parse(JSON.stringify(await formationsDAO.findAll()));
        res.send(result);
    });

    /* GET one formation for details. */
    app.get('/formations/:id([0-9]+)', async (req, res) => {
        let result = JSON.parse(JSON.stringify(await formationsDAO.findOneById(req.params.id)));
        res.send(result);
    });
}


