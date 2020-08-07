-- Procèdure de création du calendrier des présences

DELIMITER $$;

DROP PROCEDURE IF EXISTS proc_presence_etudiant;

CREATE PROCEDURE proc_presence_etudiant(p_cours_id INT UNSIGNED, p_student_id INT UNSIGNED)
BEGIN

    SELECT date_debut, date_fin INTO @debut, @fin FROM Cours WHERE id = p_cours_id;

    SET @current := @debut;

    DELETE FROM PresenceCours WHERE coursId = p_cours_id AND utilisateurId = p_student_id AND presence = 0;

    WHILE @current <= @fin
        DO
            SELECT EXISTS(SELECT coursId
                          FROM PresenceCours
                          WHERE coursId = p_cours_id
                            AND utilisateurId = p_student_id
                            AND presence = 1)
            INTO @signed;
            IF DAYOFWEEK(@current) BETWEEN 2 AND 6 AND @signed = 0 THEN
                INSERT INTO PresenceCours (date_cours, coursId, utilisateurId)
                VALUES (@current, p_cours_id, p_student_id);
            END IF;

            SET @current := DATE_ADD(@current, INTERVAL 1 DAY);
        END WHILE;

END $$;

DROP PROCEDURE IF EXISTS proc_presence_cours;

CREATE PROCEDURE proc_presence_cours(p_cours_id INT UNSIGNED)
BEGIN
    DECLARE done TINYINT UNSIGNED DEFAULT 0;
    DECLARE v_student_id INT UNSIGNED;
    DECLARE cursor_student CURSOR FOR SELECT etudiantId FROM Inscription;
    DECLARE CONTINUE HANDLER FOR NOT FOUND set done = 1;

    OPEN cursor_student;

    getStudent:
    LOOP
        FETCH cursor_student INTO v_student_id;
        IF done THEN
            LEAVE getStudent;
        END IF;
        CALL proc_presence_etudiant(p_cours_id, v_student_id);
    END LOOP getStudent;

    CLOSE cursor_student;

END $$;

DROP PROCEDURE IF EXISTS proc_presence_all;

CREATE PROCEDURE proc_presence_all()
BEGIN
    DECLARE done TINYINT UNSIGNED DEFAULT 0;
    DECLARE v_cours_id INT UNSIGNED;
    DECLARE cursor_cours CURSOR FOR SELECT id FROM Cours;
    DECLARE CONTINUE HANDLER FOR NOT FOUND set done = 1;

    OPEN cursor_cours;
    getCours:
    LOOP
        FETCH cursor_cours INTO v_cours_id;
        IF done THEN
            LEAVE getCours;
        END IF;
        CALL proc_presence_cours(v_cours_id);
    END LOOP getCours;

    CLOSE cursor_cours;

END $$;


DELIMITER ;
