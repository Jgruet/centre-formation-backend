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

utilisateursDAO.getRole = async (roleId) => {
    const sql = 'SELECT nom FROM roles WHERE id = ?';
    const result = await utilisateursDAO.query(sql, [roleId]);
    return result[0][0].nom;
};

utilisateursDAO.getUser = async (id) => {
    const sql = 'SELECT * FROM utilisateurs WHERE id = ?'
    const result = await utilisateursDAO.query(sql, [id]);
    return result[0][0];
}

module.exports = utilisateursDAO;
