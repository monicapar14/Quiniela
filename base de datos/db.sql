CREATE DATABASE IF NOT EXISTS quiniela;
USE quiniela;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'usuario') DEFAULT 'usuario',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE fases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    orden INT NOT NULL
);

CREATE TABLE grupos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fase_id INT,
    nombre VARCHAR(10) NOT NULL,

    FOREIGN KEY (fase_id) REFERENCES fases(id)
);

CREATE TABLE partidos (
    id INT AUTO_INCREMENT PRIMARY KEY,

    fase_id INT,
    grupo_id INT NULL,

    equipo_local VARCHAR(100) NOT NULL,
    equipo_visitante VARCHAR(100) NOT NULL,

    fecha DATETIME NOT NULL,

    goles_local INT NULL,
    goles_visitante INT NULL,

    ganador VARCHAR(100),

    FOREIGN KEY (fase_id) REFERENCES fases(id),
    FOREIGN KEY (grupo_id) REFERENCES grupos(id)
);

CREATE TABLE participantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    --usuario_id INT NULL,
    nombre VARCHAR(100) NOT NULL,

    --FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE predicciones (
    id INT AUTO_INCREMENT PRIMARY KEY,

    participante_id INT NOT NULL,
    partido_id INT NOT NULL,

    pred_goles_local INT NOT NULL,
    pred_goles_visitante INT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (participante_id) REFERENCES participantes(id),
    FOREIGN KEY (partido_id) REFERENCES partidos(id)
);

CREATE TABLE puntajes_partido (
    id INT AUTO_INCREMENT PRIMARY KEY,

    participante_id INT NOT NULL,
    partido_id INT NOT NULL,

    puntos INT DEFAULT 0,

    FOREIGN KEY (participante_id) REFERENCES participantes(id),
    FOREIGN KEY (partido_id) REFERENCES partidos(id)
);

CREATE TABLE marcadores_acertados (
    id INT AUTO_INCREMENT PRIMARY KEY,

    participante_id INT NOT NULL,
    partido_id INT NOT NULL,

    acerto_exacto BOOLEAN DEFAULT FALSE,

    FOREIGN KEY (participante_id) REFERENCES participantes(id),
    FOREIGN KEY (partido_id) REFERENCES partidos(id)
);

CREATE TABLE ranking (
    id INT AUTO_INCREMENT PRIMARY KEY,

    participante_id INT NOT NULL,

    puntos_totales INT DEFAULT 0,
    exactos_totales INT DEFAULT 0,

    FOREIGN KEY (participante_id) REFERENCES participantes(id)
);