CREATE DATABASE "denoland";

CREATE TABLE habitad(
	id_abitad VARCHAR(4) NOT NULL,
	PRIMARY KEY (id_abitad),
	nombre VARCHAR(100) NOT NULL,
	descripcion VARCHAR(900) NOT NULL
);

CREATE TABLE dinosaurios(
	id_dino SERIAL NOT NULL,
	PRIMARY KEY (id_dino),
	nombre VARCHAR(200) NOT NULL,
	altura VARCHAR(5) NOT NULL,
	id_abitad VARCHAR(4) NOT NULL,
	FOREIGN KEY (id_abitad) REFERENCES abitad (id_abitad),
	alimento VARCHAR(300) NOT NULL
);

CREATE TABLE encargado(
	id_encargado VARCHAR(6) NOT NULL,
	PRIMARY KEY(id_encargado),
	nombre VARCHAR(60) NOT NULL,
	usuario VARCHAR(60) NOT NULL,
	clave VARCHAR(200) NOT NULL
);

CREATE TABLE sector(
	id_sector SERIAL NOT NULL,
	PRIMARY KEY(id_sector),
	nombre VARCHAR(100) NOT NULL,
	id_encargado VARCHAR(6) NOT NULL,
	FOREIGN KEY (id_encargado) REFERENCES encagado (id_encargado)
);


CREATE TABLE DinoPsector(
	id_sector INT NOT NULL,
	FOREIGN KEY (id_sector) REFERENCES sector (id_sector),
	id_dino INT  NOT NULL,
	FOREIGN KEY (id_dino) REFERENCES dinosaurios (id_dino),
	PRIMARY KEY (id_sector ,id_dino)
);