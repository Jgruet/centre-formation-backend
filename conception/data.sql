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

INSERT INTO cours (sujet, formationId, formateurId, date_debut, date_fin, duree) VALUES
('HTML/CSS',1,2,'2020-03-16','2020-04-15',140),
('Javascript',1,2,'2020-04-16','2020-05-15',140),
('Jquery',1,2,'2020-05-16','2020-06-15',140),
('NodeJS',1,2,'2020-06-16','2020-07-01',140),
('Ionic/Angular',1,2,'2020-07-02','2020-07-30',140),
('PHP',1,2,'2020-08-01','2020-08-13',140);

INSERT INTO Formations (titre, duree, date_debut, date_fin, description, lieu, type) VALUES
('DWWM', 390, '2020-03-16', '2020-08-13', 'Formation pour devenir développeur web ou web mobile, comme tu veux', 'Bordeaux', 'À distance'),
('CDA', 520, '2020-01-18', '2020-07-22', 'Formation concepteur développeur d application', 'Paris', 'Présentielle');

INSERT INTO Ressources (titre, chemin, coursId) VALUES
('PHP intro', './ressources/php-intro.pdf', 6),
('Jquery intro', './ressources/jquery-intro.pdf', 3),
('NodeJS pour les nuls', './ressources/nodejs-nuls.pdf', 4),
('PHP avancé', './ressources/php-avancé.pdf', 6),
('Javascript', './ressources/js.pdf', 2);

INSERT INTO NoteCours(note, coursId, utilisateurId) VALUES
(8, 6, 4),
(2, 1, 3),
(10, 5, 5);

INSERT INTO devoirs(titre, coursId) VALUES
('Faire du crud', 6),
('Parcourir le DOM', 3),
('Créer une horloge', 2),
('Créer un CV avec html/css', 1);

INSERT INTO notedevoir(note, devoirsId, utilisateurId) VALUES
(10, 1, 5),
(8, 2, 6),
(9, 3, 6),
(9, 4, 4);

SET FOREIGN_KEY_CHECKS = 1;
