DROP database if exists centre_formation;
CREATE database centre_formation default character set utf8;
USE centre_formation;
SET FOREIGN_KEY_CHECKS = 0;

CREATE table Utilisateurs (
    id smallint unsigned auto_increment,
    nom varchar (55) not null,
    prenom varchar (55) not null,
    roleId tinyint unsigned not null,
    mail varchar(55) not null unique,
    mdp varchar(64) not null,
    PRIMARY KEY(id),
    CONSTRAINT Utilisateurs_to_Roles FOREIGN KEY (roleId) references Roles(id)
);

CREATE table Roles (
    id tinyint unsigned auto_increment,
    nom varchar(55),
    PRIMARY KEY(id)
);
CREATE table Formations (
    id smallint unsigned auto_increment,
    titre varchar(55) not null,
    duree smallint unsigned not null,
    date_debut date not null,
    date_fin date not null,
    description text not null,
    lieu varchar(55),
    type varchar(55) not null,
    PRIMARY KEY (id)
);
CREATE table Cours (
    id smallint unsigned auto_increment,
    formationId smallint unsigned,
    formateurId smallint unsigned,
    sujet varchar(55) not null,
    date_debut date not null,
    date_fin date not null,
    duree smallint unsigned not null,
    PRIMARY KEY (id),
    CONSTRAINT Cours_to_Formations FOREIGN KEY (formationId) references Formations(id),
    CONSTRAINT Cours_to_Utilisateurs FOREIGN KEY (formateurId) references Utilisateurs(id)
);
CREATE table Inscription (
    etudiantId smallint unsigned not null,
    formationId smallint unsigned not null,
    PRIMARY KEY (etudiantId, formationId),
    CONSTRAINT Inscription_to_Utilisateurs FOREIGN KEY (etudiantId) references Utilisateurs(id),
    CONSTRAINT Inscription_to_Formations FOREIGN KEY (formationId) references Formations(id)
);

CREATE table Devoirs (
    id smallint unsigned auto_increment,
    titre varchar(55) not null,
    coursId smallint unsigned not null,
    PRIMARY KEY (id)
    ,CONSTRAINT Devoirs_to_Cours FOREIGN KEY (coursId) references Cours(id)
);

CREATE table Ressources (
    id smallint unsigned auto_increment,
    titre varchar(55) not null,
    chemin varchar(55) not null,
    coursId smallint unsigned,
    PRIMARY KEY (id),
    CONSTRAINT Ressources_to_Cours FOREIGN KEY (coursId) references Cours(id)
);

CREATE table NoteCours (
    note tinyint unsigned not null,
    coursId smallint unsigned,
    utilisateurId smallint unsigned,
    PRIMARY KEY (coursId, utilisateurId),
    CONSTRAINT NoteCours_to_Cours FOREIGN KEY (coursId) references Cours(id),
    CONSTRAINT Notecours_to_Utilisateurs FOREIGN KEY (utilisateurId) references Utilisateurs(id)
);
CREATE table PresenceCours (
    date_cours date not null,
    presence tinyint unsigned not null default 0,
    coursId smallint unsigned,
    utilisateurId smallint unsigned,
    PRIMARY KEY (coursId, utilisateurId, date_cours),
    CONSTRAINT PresenceCours_to_Cours FOREIGN KEY (coursId) references Cours(id),
    CONSTRAINT PresenceCours_to_Utilisateurs FOREIGN KEY (utilisateurId) references Utilisateurs(id)
);
CREATE table NoteDevoir (
    note tinyint unsigned not null,
    devoirsId smallint unsigned not null,
    utilisateurId smallint unsigned not null,
    PRIMARY KEY (devoirsId, utilisateurId),
    CONSTRAINT NoteDevoir_to_Devoirs FOREIGN KEY (devoirsId) references Devoirs(id),
    CONSTRAINT NoteDevoir_to_Utilisateurs FOREIGN KEY (utilisateurId) references Utilisateurs(id)
);


SET FOREIGN_KEY_CHECKS = 1;


