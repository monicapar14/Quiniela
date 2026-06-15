//Fases
INSERT INTO `quiniela`.`fases` (`nombre`, `orden`) VALUES ('Fase de grupos', '1');
INSERT INTO `quiniela`.`fases` (`nombre`, `orden`) VALUES ('Octavos de final', '2');
INSERT INTO `quiniela`.`fases` (`nombre`, `orden`) VALUES ('Cuartos de final', '3');
INSERT INTO `quiniela`.`fases` (`nombre`, `orden`) VALUES ('Semifinal', '4');
INSERT INTO `quiniela`.`fases` (`nombre`, `orden`) VALUES ('Final', '5');

//Grupos
INSERT INTO grupos (fase_id, nombre) VALUES
(1, 'A'),
(1, 'B'),
(1, 'C'),
(1, 'D'),
(1, 'E'),
(1, 'F'),
(1, 'G'),
(1, 'H'),
(1, 'I'),
(1, 'J'),
(1, 'K'),
(1, 'L');

//participantes
INSERT INTO `quiniela`.`participantes` (`id`, `nombre`) VALUES ('1', 'Ariel y María');
INSERT INTO `quiniela`.`participantes` (`nombre`) VALUES ('Dania y Beto');
INSERT INTO `quiniela`.`participantes` (`nombre`) VALUES ('Mónica');
INSERT INTO `quiniela`.`participantes` (`nombre`) VALUES ('Keyla');
INSERT INTO `quiniela`.`participantes` (`nombre`) VALUES ('Lisa y Checha');
INSERT INTO `quiniela`.`participantes` (`nombre`) VALUES ('Julio');
INSERT INTO `quiniela`.`participantes` (`nombre`) VALUES ('Alvaro');
INSERT INTO `quiniela`.`participantes` (`nombre`) VALUES ('Mario');
INSERT INTO `quiniela`.`participantes` (`nombre`) VALUES ('Hugo');
INSERT INTO `quiniela`.`participantes` (`nombre`) VALUES ('Sonia');
INSERT INTO `quiniela`.`participantes` (`nombre`) VALUES ('Saúl y Ale');
INSERT INTO `quiniela`.`participantes` (`nombre`) VALUES ('Daniel');
INSERT INTO `quiniela`.`participantes` (`nombre`) VALUES ('Janda y Marvin');
INSERT INTO `quiniela`.`participantes` (`nombre`) VALUES ('Norma y Mara');
INSERT INTO `quiniela`.`participantes` (`nombre`) VALUES ('Francis');
INSERT INTO `quiniela`.`participantes` (`nombre`) VALUES ('Rony');
INSERT INTO `quiniela`.`participantes` (`nombre`) VALUES ('Laura');
INSERT INTO `quiniela`.`participantes` (`nombre`) VALUES ('Kevin');

//partidos
INSERT INTO partidos (fase_id, grupo_id, equipo_local, equipo_visitante, fecha) VALUES
-- 11 JUN
(1, 1,  'México',        'Sudáfrica',    '2026-06-11 13:00:00'),
(1, 1,  'Corea del Sur', 'Chequia',      '2026-06-11 20:00:00'),

-- 12 JUN
(1, 2,  'Canadá',        'Bosnia',       '2026-06-12 13:00:00'),
(1, 4,  'USA',           'Paraguay',     '2026-06-12 19:00:00'),

-- 13 JUN
(1, 2,  'Qatar',         'Suiza',        '2026-06-13 13:00:00'),
(1, 3,  'Brasil',        'Marruecos',    '2026-06-13 16:00:00'),
(1, 3,  'Haití',         'Escocia',      '2026-06-13 19:00:00'),
(1, 4,  'Australia',     'Turquía',      '2026-06-13 22:00:00'),

-- 14 JUN
(1, 5,  'Alemania',      'Curazao',      '2026-06-14 11:00:00'),
(1, 6,  'Países Bajos',  'Japón',        '2026-06-14 14:00:00'),
(1, 5,  'Costa de Marfil','Ecuador',     '2026-06-14 17:00:00'),
(1, 6,  'Suecia',        'Túnez',        '2026-06-14 20:00:00'),

-- 15 JUN
(1, 8,  'España',        'Cabo Verde',   '2026-06-15 10:00:00'),
(1, 7,  'Bélgica',       'Egipto',       '2026-06-15 13:00:00'),
(1, 8,  'Arabia Saudita','Uruguay',      '2026-06-15 16:00:00'),
(1, 7,  'Irán',          'Nueva Zelanda','2026-06-15 19:00:00'),

-- 16 JUN
(1, 9,  'Francia',       'Senegal',      '2026-06-16 13:00:00'),
(1, 9,  'Irak',          'Noruega',      '2026-06-16 16:00:00'),
(1, 10, 'Argentina',     'Argelia',      '2026-06-16 19:00:00'),
(1, 10, 'Austria',       'Jordania',     '2026-06-16 22:00:00'),

-- 17 JUN
(1, 11, 'Portugal',      'Rep. D. Congo','2026-06-17 11:00:00'),
(1, 12, 'Inglaterra',    'Croacia',      '2026-06-17 14:00:00'),
(1, 12, 'Ghana',         'Panamá',       '2026-06-17 17:00:00'),
(1, 11, 'Uzbekistán',    'Colombia',     '2026-06-17 20:00:00'),

-- 18 JUN
(1, 1,  'Chequia',       'Sudáfrica',    '2026-06-18 10:00:00'),
(1, 2,  'Suiza',         'Bosnia',       '2026-06-18 13:00:00'),
(1, 2,  'Canadá',        'Qatar',        '2026-06-18 16:00:00'),
(1, 1,  'México',        'Corea del Sur','2026-06-18 19:00:00'),

-- 19 JUN
(1, 4,  'USA',           'Australia',    '2026-06-19 13:00:00'),
(1, 3,  'Escocia',       'Marruecos',    '2026-06-19 16:00:00'),
(1, 3,  'Brasil',        'Haití',        '2026-06-19 18:30:00'),
(1, 4,  'Turquía',       'Paraguay',     '2026-06-19 21:00:00'),

-- 20 JUN
(1, 6,  'Países Bajos',  'Suecia',       '2026-06-20 11:00:00'),
(1, 5,  'Alemania',      'Costa de Marfil','2026-06-20 14:00:00'),
(1, 5,  'Ecuador',       'Curazao',      '2026-06-20 18:00:00'),
(1, 6,  'Túnez',         'Japón',        '2026-06-20 22:00:00'),

-- 21 JUN
(1, 8,  'España',        'Arabia Saudita','2026-06-21 10:00:00'),
(1, 7,  'Bélgica',       'Irán',         '2026-06-21 13:00:00'),
(1, 8,  'Uruguay',       'Cabo Verde',   '2026-06-21 16:00:00'),
(1, 7,  'Nueva Zelanda', 'Egipto',       '2026-06-21 19:00:00'),

-- 22 JUN
(1, 10, 'Argentina',     'Austria',      '2026-06-22 11:00:00'),
(1, 9,  'Francia',       'Irak',         '2026-06-22 15:00:00'),
(1, 9,  'Noruega',       'Senegal',      '2026-06-22 18:00:00'),
(1, 10, 'Jordania',      'Argelia',      '2026-06-22 21:00:00'),

-- 23 JUN
(1, 11, 'Portugal',      'Uzbekistán',   '2026-06-23 11:00:00'),
(1, 12, 'Inglaterra',    'Ghana',        '2026-06-23 14:00:00'),
(1, 12, 'Panamá',        'Croacia',      '2026-06-23 17:00:00'),
(1, 11, 'Colombia',      'Rep. D. Congo','2026-06-23 20:00:00'),

-- 24 JUN (última jornada grupos A, B, C)
(1, 2,  'Suiza',         'Canadá',       '2026-06-24 13:00:00'),
(1, 2,  'Bosnia',        'Qatar',        '2026-06-24 13:00:00'),
(1, 3,  'Escocia',       'Brasil',       '2026-06-24 16:00:00'),
(1, 3,  'Marruecos',     'Haití',        '2026-06-24 16:00:00'),
(1, 1,  'Chequia',       'México',       '2026-06-24 19:00:00'),
(1, 1,  'Sudáfrica',     'Corea del Sur','2026-06-24 19:00:00'),

-- 25 JUN (última jornada grupos D, E, F)
(1, 5,  'Curazao',       'Costa de Marfil','2026-06-25 14:00:00'),
(1, 5,  'Ecuador',       'Alemania',     '2026-06-25 14:00:00'),
(1, 6,  'Japón',         'Suecia',       '2026-06-25 17:00:00'),
(1, 6,  'Túnez',         'Países Bajos', '2026-06-25 17:00:00'),
(1, 4,  'Turquía',       'USA',          '2026-06-25 20:00:00'),
(1, 4,  'Paraguay',      'Australia',    '2026-06-25 20:00:00'),

-- 26 JUN (última jornada grupos G, H, I)
(1, 9,  'Noruega',       'Francia',      '2026-06-26 13:00:00'),
(1, 9,  'Senegal',       'Irak',         '2026-06-26 13:00:00'),
(1, 8,  'Cabo Verde',    'Arabia Saudita','2026-06-26 18:00:00'),
(1, 8,  'Uruguay',       'España',       '2026-06-26 18:00:00'),
(1, 7,  'Egipto',        'Irán',         '2026-06-26 21:00:00'),
(1, 7,  'Nueva Zelanda', 'Bélgica',      '2026-06-26 21:00:00'),

-- 27 JUN (última jornada grupos J, K, L)
(1, 12, 'Panamá',        'Inglaterra',   '2026-06-27 15:00:00'),
(1, 12, 'Croacia',       'Ghana',        '2026-06-27 15:00:00'),
(1, 11, 'Colombia',      'Portugal',     '2026-06-27 17:30:00'),
(1, 11, 'Rep. D. Congo', 'Uzbekistán',   '2026-06-27 17:30:00'),
(1, 10, 'Argelia',       'Austria',      '2026-06-27 20:00:00'),
(1, 10, 'Jordania',      'Argentina',    '2026-06-27 20:00:00');

UPDATE `quiniela`.`partidos` SET `goles_local` = '2', `goles_visitante` = '0' WHERE (`id` = '1');
UPDATE `quiniela`.`partidos` SET `goles_local` = '2', `goles_visitante` = '1' WHERE (`id` = '2');
UPDATE `quiniela`.`partidos` SET `goles_local` = '1', `goles_visitante` = '1' WHERE (`id` = '3');

//login
INSERT INTO usuarios(nombre,password_hash,rol)
VALUES(
'Mpar',
'$2a$12$XDUCD0m91DR9A.83CDR8o.3YvX6FlM17BMylJeNa.cl3L51.DCLrG',
'admin'
);

INSERT INTO usuarios(nombre,password_hash,rol)
VALUES(
'Dani',
'$2a$12$UCbkqlzpw8MFCn5AcbCCkexEsPOxJ/nLQ/Dg5chssjtCuhrZ.gLQO',
'admin'
);

//scripts
ALTER TABLE puntajes_partido
ADD UNIQUE(participante_id, partido_id);

ALTER TABLE marcadores_acertados
ADD UNIQUE(participante_id, partido_id);

ALTER TABLE ranking
ADD UNIQUE(participante_id);