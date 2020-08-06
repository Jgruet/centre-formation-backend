const { DAO } = require('./dao');

const utilisateursDAO = new DAO ('utilisateurs');

utilisateursDAO.checkEmail = async (mail) => {
    const sql = 'SELECT mail FROM utilisateurs WHERE mail = ?';
    const result = await utilisateursDAO.query(sql, [mail]);
    return result[0][0];
};

module.exports = utilisateursDAO;
