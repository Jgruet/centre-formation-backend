const { DAO } = require('./dao');

const utilisateursDAO = new DAO ('utilisateurs');

utilisateursDAO.checkEmail = async (mail) => {
    const sql = 'SELECT mail FROM utilisateurs WHERE mail = ?';
    const result = await utilisateursDAO.query(sql, [mail]);
    return result[0][0];
};

// Récupération données user
utilisateursDAO.findUserByEmail = async (mail) => {
    const sql = 'SELECT * FROM utilisateurs WHERE mail = ?';
    const result = await utilisateursDAO.query(sql, [mail]);
    return result[0][0];
};

module.exports = utilisateursDAO;
