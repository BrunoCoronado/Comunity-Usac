CREATE SEQUENCE facultad_registro_sequence;
CREATE SEQUENCE carrera_registro_sequence;
CREATE SEQUENCE rol_registro_sequence;
CREATE SEQUENCE usuario_registro_sequence;

CREATE TRIGGER facultad_registro_trg BEFORE INSERT ON facultad
    FOR EACH ROW 
        BEGIN 
            SELECT facultad_registro_sequence.nextval
            INTO :new.codigo_facultad
            FROM dual;
        END;   
        
CREATE TRIGGER carrera_registro_trg BEFORE INSERT ON carrera
    FOR EACH ROW 
        BEGIN 
            SELECT carrera_registro_sequence.nextval
            INTO :new.codigo_carrera
            FROM dual;
        END;   
    
CREATE TRIGGER rol_registro_trg BEFORE INSERT ON rol
    FOR EACH ROW 
        BEGIN 
            SELECT rol_registro_sequence.nextval
            INTO :new.codigo_rol
            FROM dual;
        END;           

CREATE TRIGGER usuario_registro_trg BEFORE INSERT ON usuario
    FOR EACH ROW 
        BEGIN 
            SELECT usuario_registro_sequence.nextval
            INTO :new.registro
            FROM dual;
        END;   

CREATE TABLE facultad (
    codigo_facultad NUMERIC NOT NULL,
    nombre VARCHAR2(75) NOT NULL,
    descripcion VARCHAR(200) NULL,
    estado NUMERIC NOT NULL,
    CONSTRAINT facultad_pk PRIMARY KEY(codigo_facultad)
);

CREATE TABLE carrera (
    codigo_carrera NUMERIC NOT NULL,
    nombre VARCHAR2(75) NOT NULL,
    descripcion VARCHAR2(200) NULL,
    codigo_facultad NUMERIC NOT NULL, 
    estado NUMERIC NOT NULL,
    CONSTRAINT carrera_pk PRIMARY KEY(codigo_carrera), 
    CONSTRAINT facultad_fk FOREIGN KEY(codigo_facultad) REFERENCES facultad(codigo_facultad)
);

CREATE TABLE rol(
    codigo_rol NUMERIC NOT NULL,
    nombre VARCHAR2(50) NOT NULL,
    descripcion VARCHAR2(200) NULL,
    estado NUMERIC NOT NULL,
    CONSTRAINT rol_pk PRIMARY KEY(codigo_rol)
);

CREATE TABLE usuario (
    registro NUMERIC NOT NULL,
    nombre VARCHAR2(75) NOT NULL,
    fotografia VARCHAR(150) NOT NULL,
    correo VARCHAR(75) NULL,
    telefono NUMERIC NULL,
    password VARCHAR(75) NOT NULL,
    estado NUMERIC NOT NULL,
    CONSTRAINT usuario_pk PRIMARY KEY (registro)
);

CREATE TABLE usuario_rol (
    registro NUMERIC NOT NULL,
    codigo_rol NUMERIC NOT NULL,
    CONSTRAINT ur_usuario_fk FOREIGN KEY(registro) REFERENCES usuario(registro),
    CONSTRAINT ur_rol_fk FOREIGN KEY(codigo_rol) REFERENCES rol(codigo_rol),
    CONSTRAINT ur_usuario_rol_pk PRIMARY KEY(registro, codigo_rol)
);

CREATE TABLE usuario_facultad(
    registro NUMERIC NOT NULL,
    codigo_facultad NUMERIC NOT NULL,
    CONSTRAINT uf_usuario_fk FOREIGN KEY(registro) REFERENCES usuario(registro),
    CONSTRAINT uf_facultad_fk FOREIGN KEY(codigo_facultad) REFERENCES facultad(codigo_facultad),
    CONSTRAINT uf_usuario_facultad_pk PRIMARY KEY(registro, codigo_facultad)
);

CREATE TABLE usuario_carrera(
    registro NUMERIC NOT NULL,
    codigo_carrera NUMERIC NOT NULL,
    CONSTRAINT uc_usuario_fk FOREIGN KEY(registro) REFERENCES usuario(registro),
    CONSTRAINT uc_carrera_fk FOREIGN KEY(codigo_carrera) REFERENCES carrera(codigo_carrera)
);


DROP TABLE facultad;
DROP TABLE carrera;
DROP TABLE rol;
DROP TABLE usuario;
DROP TABLE usuario_rol;
DROP TABLE usuario_facultad;
DROP TABLE usuario_carrera;

INSERT INTO facultad(nombre, estado) VALUES ('Ingenieria', 0);
INSERT INTO facultad(nombre, estado) VALUES ('Medicina', 0);
INSERT INTO facultad(nombre, estado) VALUES ('Odontologia', 0);
INSERT INTO facultad(nombre, estado) VALUES ('Agronomia', 0);
INSERT INTO facultad(nombre, estado) VALUES ('Arquitectura', 0);
INSERT INTO facultad(nombre, estado) VALUES ('Derecho', 0);

SELECT * FROM facultad;

INSERT INTO carrera(codigo_facultad, nombre, estado) VALUES (1, 'Ciencias y Sistemas', 0);
INSERT INTO carrera(codigo_facultad, nombre, estado) VALUES (1, 'Mecanica', 0);
INSERT INTO carrera(codigo_facultad, nombre, estado) VALUES (1, 'Quimica', 0);
INSERT INTO carrera(codigo_facultad, nombre, estado) VALUES (1, 'Industrial', 0);
INSERT INTO carrera(codigo_facultad, nombre, estado) VALUES (2, 'Fisioterapia', 0);
INSERT INTO carrera(codigo_facultad, nombre, estado) VALUES (2, 'Terapia Respiratoria', 0);
INSERT INTO carrera(codigo_facultad, nombre, estado) VALUES (2, 'Enfermeria', 0);
INSERT INTO carrera(codigo_facultad, nombre, estado) VALUES (2, 'Medico y Cirujano', 0);
INSERT INTO carrera(codigo_facultad, nombre, estado) VALUES (3, 'Cirujano Dentista', 0);
INSERT INTO carrera(codigo_facultad, nombre, estado) VALUES (4, 'Gestion Ambiental', 0);
INSERT INTO carrera(codigo_facultad, nombre, estado) VALUES (4, 'Industrias Agropecuarias y Forestales', 0);
INSERT INTO carrera(codigo_facultad, nombre, estado) VALUES (5, 'Arquitectura', 0);
INSERT INTO carrera(codigo_facultad, nombre, estado) VALUES (5, 'Disenio Grafico', 0);
INSERT INTO carrera(codigo_facultad, nombre, estado) VALUES (6, 'Ciencias Juridicas y Sociales, Abogacia y Notariado', 0);

SELECT * FROM carrera;

INSERT INTO rol(nombre, estado) VALUES('Administrador', 0);
INSERT INTO rol(nombre, estado) VALUES('Estudiante', 0);
INSERT INTO rol(nombre, estado) VALUES('Catedratico', 0);
INSERT INTO rol(nombre, estado) VALUES('Auxiliar', 0);
INSERT INTO rol(nombre, estado) VALUES('Junta Directiva', 0);

SELECT * FROM rol;

INSERT INTO usuario(nombre, fotografia, correo, telefono, password, estado) VALUES('Bruno Coronado', './profile.png', 'bcoronado.morales@gmail.com',51107613, '23111997', 0);
INSERT INTO usuario(nombre, fotografia, correo, telefono, password, estado) VALUES('Luis Coronado', './profile.png', 'luisCor@gmail.com',52669476, '52669476', 0);
INSERT INTO usuario(nombre, fotografia, correo, telefono, password, estado) VALUES('Beatriz Morales', './profile.png', 'orugagreen@gmail.com',58384314, '58384314', 0);
INSERT INTO usuario(nombre, fotografia, correo, password, estado) VALUES('Minino Bigotes', './profile.png', 'bigotes@gmail.com', 'croquetas', 0);

SELECT * FROM usuario;














