
USE centre_formation;

SET FOREIGN_KEY_CHECKS = 0;

INSERT INTO inscription(etudiantId,formationId) VALUES (3,1),(4,2),(5,1);

INSERT INTO Utilisateurs (nom, prenom, roleId, mail, mdp) VALUES
('Calmel', 'Quentin', 1, 'calmel@mail.com', '123456'),
('Maloron', 'Sébastien', 2, 'maloron@mail.com', '123456'),
('Dujardin', 'Eric', 3, 'dujardin@mail.com', '123456'),
('Gruet', 'Jonathan', 3, 'gruet@mail.com', '123456'),
('Vandevraye', 'Grégory', 3, 'vandevraye@mail.com', '123456');

INSERT INTO Roles (nom) VALUES
('Administrateur'),
('Formateur'),
('Etudiant');
