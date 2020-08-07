const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const user = require("../models/utilisateursDAO")

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    //console.log(token);

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        req.role = decoded.role
        console.log("verify token req.userId: " + req.userId)
        console.log("verify token req.role: " + req.role)
        next();
    });
};

isAdmin = (req, res, next) => {
    console.log("req.userId: " + req.userId)
    user.getUser(req.userId)
        .then(user => {
            console.log('user:' + user)
            if (user.roleId === 1) {
                next();
                return;
            }

            res.status(403).send({
                message: "Require Admin Role!"
            })
        });
};

isModeratorOrAdmin = (req, res, next) => {
    user.getUser(req.userId)
        .then(user => {
            console.log('user:' + user);
            if (user.roleId === 2 || user.roleId === 1) {
                next();
                return;
            }

            res.status(403).send({
                message: "Require Moderator or Admin Role!"
            });
        });

};

isAuthentificated = (req, res, next) => {
    user.getUser(req.userId)
        .then(user => {
            console.log('user:' + user);
            if (user.roleId) {
                next();
                return;
            }
            res.status(403).send({
                message: "Require Moderator or Admin Role!"
            });
        });

};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModeratorOrAdmin: isModeratorOrAdmin,
    isAuthentificated: isAuthentificated
};
module.exports = authJwt;
