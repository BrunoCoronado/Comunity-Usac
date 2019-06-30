CREATE SEQUENCE rol_registro_sequence;

DROP SEQUENCE rol_registro_sequence;
    
CREATE TRIGGER rol_registro_trg BEFORE INSERT ON rol
    FOR EACH ROW 
        BEGIN 
            SELECT rol_registro_sequence.nextval
            INTO :new.codigo_rol
            FROM dual;
        END;           

DROP TRIGGER rol_registro_trg;

CREATE TABLE facultad (
    codigo_facultad NUMERIC NOT NULL,
    nombre VARCHAR2(75) NOT NULL,
    descripcion VARCHAR2(200) NULL,
    estado NUMERIC NOT NULL,
    CONSTRAINT facultad_pk PRIMARY KEY(codigo_facultad)
);

CREATE TABLE carrera (
    codigo_carrera NUMERIC NOT NULL,
    nombre VARCHAR2(75) NOT NULL,
    descripcion VARCHAR2(200) NULL,
    estado NUMERIC NOT NULL,
    codigo_facultad NUMERIC NOT NULL, 
    CONSTRAINT carrera_pk PRIMARY KEY(codigo_carrera), 
    CONSTRAINT facultad_fk FOREIGN KEY(codigo_facultad) REFERENCES facultad(codigo_facultad)
);

CREATE TABLE ciencia(
    codigo_ciencia NUMERIC NOT NULL,
    nombre VARCHAR2(75) NOT NULL,
    descripcion VARCHAR2(200) NULL,
    estado NUMERIC NOT NULL,
    CONSTRAINT ciencia_pk PRIMARY KEY(codigo_ciencia)
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
    CONSTRAINT uca_usuario_fk FOREIGN KEY(registro) REFERENCES usuario(registro),
    CONSTRAINT uca_carrera_fk FOREIGN KEY(codigo_carrera) REFERENCES carrera(codigo_carrera),
    CONSTRAINT uca_usuario_carrera_pk PRIMARY KEY(registro, codigo_carrera)
);

CREATE TABLE usuario_ciencia(
    registro NUMERIC NOT NULL,
    codigo_ciencia NUMERIC NOT NULL,
    CONSTRAINT uci_usuario_fk FOREIGN KEY(registro) REFERENCES usuario(registro),
    CONSTRAINT uci_ciencia_fk FOREIGN KEY(codigo_ciencia) REFERENCES ciencia(codigo_ciencia),
    CONSTRAINT uci_usuario_ciencia_pk PRIMARY KEY(registro, codigo_ciencia)
);

DROP TABLE facultad;
DROP TABLE carrera;
DROP TABLE ciencia;
DROP TABLE rol;
DROP TABLE usuario;
DROP TABLE usuario_rol;
DROP TABLE usuario_facultad;
DROP TABLE usuario_carrera;

INSERT INTO facultad(codigo_facultad, nombre, estado) VALUES (01, 'Ingenieria', 0);
INSERT INTO facultad(codigo_facultad, nombre, estado) VALUES (02, 'Medicina', 0);
INSERT INTO facultad(codigo_facultad, nombre, estado) VALUES (03, 'Odontologia', 0);
INSERT INTO facultad(codigo_facultad, nombre, estado) VALUES (04, 'Agronomia', 0);
INSERT INTO facultad(codigo_facultad, nombre, estado) VALUES (05, 'Arquitectura', 0);
INSERT INTO facultad(codigo_facultad, nombre, estado) VALUES (06, 'Derecho', 0);

TRUNCATE TABLE facultad;

SELECT * FROM facultad;
SELECT codigo_facultad as "codigo", nombre as "nombre", descripcion as "descripcion" FROM facultad WHERE estado = 0 AND codigo_facultad > 0;

UPDATE facultad SET estado = 0 WHERE codigo_facultad > 0;
COMMIT;

CREATE OR REPLACE VIEW listar_facultades AS 
    SELECT codigo_facultad as "codigo", nombre "nombre", descripcion "descripcion" 
    FROM facultad
    WHERE estado = 0;    

DROP VIEW listar_facultades;

SELECT * FROM listar_facultades;

CREATE OR REPLACE PROCEDURE Listar_Facultades
IS 
    BEGIN
        SELECT codigo_facultad "codigo", nombre "nombre", descripcion "descripcion" FROM facultad WHERE estado = 0;
    END;

DROP PROCEDURE listar_facultades;

CREATE OR REPLACE PROCEDURE Obtener_Facultad (codigo_f IN NUMERIC) 
IS  
    BEGIN
        SELECT codigo_facultad "codigo", nombre "nombre", descripcion "descripcion" FROM facultad WHERE estado = 0 AND codigo_facultad = codigo_f;
    END;
    
DROP PROCEDURE obtener_facultad;    

CREATE OR REPLACE PROCEDURE Insertar_Facultad (codigo_f IN NUMERIC, nombre_f IN VARCHAR2, descripcion_f IN VARCHAR2)
IS
    BEGIN
        INSERT INTO facultad(codigo_facultad, nombre, descripcion, estado) VALUES(codigo_f, nombre_f, descripcion_f,  0);
    END;    
 
BEGIN           
    insertar_facultad(07, 'Humanidades', 'Facultad Humanidades USAC');
    COMMIT;
END;

CREATE OR REPLACE PROCEDURE Actualizar_Facultad (codigo_f IN NUMERIC, nombre_f IN VARCHAR2, descripcion_f IN VARCHAR2)
IS
    BEGIN
        UPDATE facultad SET nombre = nombre_f, descripcion = descripcion_f WHERE codigo_facultad = codigo_f;
    END;
    
BEGIN
    actualizar_facultad(5, 'Arquitectura', 'Facultad Arcquitectura USAC', 0);    
    COMMIT;
END;

CREATE OR REPLACE PROCEDURE Eliminar_Facultad (codigo_f IN NUMERIC)
IS 
    BEGIN 
        UPDATE facultad SET estado = 1 WHERE codigo_facultad = codigo_f;
    END;
    
BEGIN
    eliminar_facultad(6);
    COMMIT;
END;

INSERT INTO carrera(codigo_carrera, codigo_facultad, nombre, estado) VALUES (1, 1, 'Ciencias y Sistemas', 0);
INSERT INTO carrera(codigo_carrera, codigo_facultad, nombre, estado) VALUES (2, 1, 'Mecanica', 0);
INSERT INTO carrera(codigo_carrera, codigo_facultad, nombre, estado) VALUES (3, 1, 'Quimica', 0);
INSERT INTO carrera(codigo_carrera, codigo_facultad, nombre, estado) VALUES (4, 1, 'Industrial', 0);
INSERT INTO carrera(codigo_carrera, codigo_facultad, nombre, estado) VALUES (5, 2, 'Fisioterapia', 0);
INSERT INTO carrera(codigo_carrera, codigo_facultad, nombre, estado) VALUES (6, 2, 'Terapia Respiratoria', 0);
INSERT INTO carrera(codigo_carrera, codigo_facultad, nombre, estado) VALUES (7, 2, 'Enfermeria', 0);
INSERT INTO carrera(codigo_carrera, codigo_facultad, nombre, estado) VALUES (8, 2, 'Medico y Cirujano', 0);
INSERT INTO carrera(codigo_carrera, codigo_facultad, nombre, estado) VALUES (9, 3, 'Cirujano Dentista', 0);
INSERT INTO carrera(codigo_carrera, codigo_facultad, nombre, estado) VALUES (10, 4, 'Gestion Ambiental', 0);
INSERT INTO carrera(codigo_carrera, codigo_facultad, nombre, estado) VALUES (11, 4, 'Industrias Agropecuarias y Forestales', 0);
INSERT INTO carrera(codigo_carrera, codigo_facultad, nombre, estado) VALUES (12, 5, 'Arquitectura', 0);
INSERT INTO carrera(codigo_carrera, codigo_facultad, nombre, estado) VALUES (13, 5, 'Disenio Grafico', 0);
INSERT INTO carrera(codigo_carrera, codigo_facultad, nombre, estado) VALUES (14, 6, 'Ciencias Juridicas y Sociales, Abogacia y Notariado', 0);

SELECT * FROM carrera;

SELECT c.codigo_carrera "codigo", c.nombre "nombre", c.descripcion "descripcion", f.nombre "facultad" 
FROM carrera c 
INNER JOIN facultad f ON c.codigo_facultad = f.codigo_facultad
AND c.estado = 0;



CREATE OR REPLACE PROCEDURE  Insertar_Carrera(cod_c IN NUMERIC, cod_f IN NUMERIC, nombre_c IN VARCHAR2, descripcion_c IN VARCHAR2)
IS
    BEGIN
        INSERT INTO carrera(codigo_carrera, codigo_facultad, nombre, descripcion, estado) VALUES(cod_c, cod_f, nombre_c, descripcion_c, 0);
    END;

CREATE OR REPLACE PROCEDURE Actualizar_Carrera(cod_c IN NUMERIC, cod_f IN NUMERIC, nombre_c IN VARCHAR2, descripcion_c IN VARCHAR2)
IS
    BEGIN 
        UPDATE carrera SET codigo_facultad = cod_f, nombre = nombre_c, descripcion = descripcion_c WHERE codigo_carrera = cod_c;
    END;

CREATE OR REPLACE PROCEDURE Eliminar_Carrera(cod_c IN NUMERIC)
IS
    BEGIN
        UPDATE carrera SET estado = 1 WHERE codigo_carrera = cod_c;
    END;
    

INSERT INTO ciencia(codigo_ciencia, nombre, estado) VALUES(1, 'Estructuras de Datos', 0); 
INSERT INTO ciencia(codigo_ciencia, nombre, estado) VALUES(2, 'Matematica Basica 1', 0); 
INSERT INTO ciencia(codigo_ciencia, nombre, estado) VALUES(3, 'Manejo E Implementacion de Archivos', 0); 
INSERT INTO ciencia(codigo_ciencia, nombre, estado) VALUES(4, 'Organizacion Computacional', 0); 
INSERT INTO ciencia(codigo_ciencia, nombre, estado) VALUES(5, 'Teoria de Sistemas 1', 0); 
INSERT INTO ciencia(codigo_ciencia, nombre, estado) VALUES(6, 'Introduccion al Derecho 1', 0); 
INSERT INTO ciencia(codigo_ciencia, nombre, estado) VALUES(7, 'Quimica Oraganica 1', 0); 
INSERT INTO ciencia(codigo_ciencia, nombre, estado) VALUES(8, 'Teoria Social 1', 0); 
COMMIT;
SELECT * FROM ciencia;

SELECT codigo_ciencia "codigo", nombre "nombre", descripcion "descripcion" FROM ciencia WHERE estado = 0;

SELECT codigo_ciencia "codigo", nombre "nombre", descripcion "descripcion"
FROM ciencia
WHERE estado = 0
AND codigo_ciencia = 1;

CREATE OR REPLACE PROCEDURE Insertar_Ciencia(cod_c IN NUMERIC, nombre_c IN VARCHAR2, descripcion_c IN VARCHAR2)
IS 
    BEGIN
        INSERT INTO ciencia(codigo_ciencia, nombre, descripcion, estado) VALUES (cod_c, nombre_c, descripcion_c, 0);
    END;
    
CREATE OR REPLACE PROCEDURE Actualizar_Ciencia(cod_c IN NUMERIC, nombre_c IN VARCHAR2, descripcion_c IN VARCHAR2)
IS 
    BEGIN
        UPDATE ciencia SET nombre = nombre_c, descripcion = descripcion_c WHERE codigo_ciencia = cod_c;
    END;
    
CREATE OR REPLACE PROCEDURE Eliminar_Ciencia(cod_c IN NUMERIC)
IS 
    BEGIN
        UPDATE ciencia SET estado = 1 WHERE codigo_ciencia = cod_c;
    END;
    


INSERT INTO rol(nombre, estado) VALUES('Administrador', 0);
INSERT INTO rol(nombre, estado) VALUES('Estudiante', 0);
INSERT INTO rol(nombre, estado) VALUES('Catedratico', 0);
INSERT INTO rol(nombre, estado) VALUES('Auxiliar', 0);
INSERT INTO rol(nombre, estado) VALUES('Junta Directiva', 0);
COMMIT;

TRUNCATE TABLE rol;

SELECT * FROM rol; 

CREATE OR REPLACE PROCEDURE Insertar_Rol (nombre_r IN VARCHAR2, descripcion_r IN VARCHAR2)    
IS 
    BEGIN
        INSERT INTO rol(nombre, descripcion, estado) VALUES(nombre_r, descripcion_r, 0);
    END;
    
BEGIN
    insertar_rol('Conserje', 'Mantenimiento USAC');
    COMMIT;
END;
    
CREATE OR REPLACE PROCEDURE Actualizar_Rol (codigo_r IN NUMERIC, nombre_r IN VARCHAR2, descripcion_r IN VARCHAR2)
IS 
    BEGIN
        UPDATE rol SET nombre = nombre_r, descripcion = descripcion_r WHERE codigo_rol = codigo_r;
    END;

CREATE OR REPLACE PROCEDURE Eliminar_Rol (codigo_r IN NUMERIC)
IS 
    BEGIN
        UPDATE rol SET estado = 1  WHERE codigo_rol = codigo_r;
    END;


INSERT INTO usuario(nombre, fotografia, correo, telefono, password, estado) VALUES('Bruno Coronado', './profile.png', 'bcoronado.morales@gmail.com',51107613, '23111997', 0);
INSERT INTO usuario(nombre, fotografia, correo, telefono, password, estado) VALUES('Luis Coronado', './profile.png', 'luisCor@gmail.com',52669476, '52669476', 0);
INSERT INTO usuario(nombre, fotografia, correo, telefono, password, estado) VALUES('Beatriz Morales', './profile.png', 'orugagreen@gmail.com',58384314, '58384314', 0);
INSERT INTO usuario(nombre, fotografia, correo, password, estado) VALUES('Minino Bigotes', './profile.png', 'bigotes@gmail.com', 'croquetas', 0);

SELECT * FROM usuario;












