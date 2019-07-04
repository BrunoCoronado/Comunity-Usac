CREATE SEQUENCE rol_registro_sequence;
CREATE SEQUENCE ca_ci_registro_sequence;
CREATE SEQUENCE u_r_registro_sequence;
CREATE SEQUENCE u_ca_registro_sequence;
CREATE SEQUENCE u_ci_registro_sequence;

DROP SEQUENCE rol_registro_sequence;
    
CREATE OR REPLACE TRIGGER rol_registro_trg BEFORE INSERT ON rol
    FOR EACH ROW 
        BEGIN 
            SELECT rol_registro_sequence.nextval
            INTO :new.codigo_rol
            FROM dual;
        END;           

CREATE OR REPLACE TRIGGER ca_ci_registro_trg BEFORE INSERT ON carrera_ciencia
    FOR EACH ROW    
        BEGIN
            SELECT ca_ci_registro_sequence.nextval
            INTO :new.codigo_ca_ci
            FROM dual;
        END;    

CREATE OR REPLACE TRIGGER u_r_registro_trg BEFORE INSERT ON usuario_rol
    FOR EACH ROW    
        BEGIN
            SELECT u_r_registro_sequence.nextval
            INTO :new.codigo_u_r
            FROM dual;
        END;     
 
CREATE OR REPLACE TRIGGER u_ca_registro_trg BEFORE INSERT ON usuario_carrera
    FOR EACH ROW    
        BEGIN
            SELECT u_ca_registro_sequence.nextval
            INTO :new.codigo_u_ca
            FROM dual;
        END;     

CREATE OR REPLACE TRIGGER u_ci_registro_trg BEFORE INSERT ON usuario_ciencia
    FOR EACH ROW    
        BEGIN
            SELECT u_ci_registro_sequence.nextval
            INTO :new.codigo_u_ci
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

CREATE TABLE carrera_ciencia(
    codigo_ca_ci NUMERIC NOT NULL,  
    codigo_carrera NUMERIC NOT NULL,
    codigo_ciencia NUMERIC NOT NULL,
    estado NUMERIC NOT NULL,
    CONSTRAINT caci_carrera_fk FOREIGN KEY(codigo_carrera) REFERENCES carrera(codigo_carrera),
    CONSTRAINT caci_ciencia_fk FOREIGN KEY(codigo_ciencia) REFERENCES ciencia(codigo_ciencia),
    CONSTRAINT caci_carrera_ciencia_pk PRIMARY KEY(codigo_ca_ci)
);

DROP TABLE carrera_ciencia;

ALTER TABLE carrera_ciencia ADD estado NUMERIC;

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
    contrasenia VARCHAR2(75) NOT NULL,
    correo VARCHAR2(75) NULL,
    telefono NUMERIC NULL,
    fotografia VARCHAR2(200) NOT NULL,
    estado NUMERIC NOT NULL,
    CONSTRAINT usuario_pk PRIMARY KEY (registro)
);

CREATE TABLE usuario_rol (
    codigo_u_r NUMERIC NOT NULL,
    registro NUMERIC NOT NULL,
    codigo_rol NUMERIC NOT NULL,
    estado NUMERIC NOT NULL,
    CONSTRAINT ur_usuario_fk FOREIGN KEY(registro) REFERENCES usuario(registro),
    CONSTRAINT ur_rol_fk FOREIGN KEY(codigo_rol) REFERENCES rol(codigo_rol),
    CONSTRAINT ur_usuario_rol_pk PRIMARY KEY(codigo_u_r)
);

CREATE TABLE usuario_carrera(
    codigo_u_ca NUMERIC NOT NULL,
    registro NUMERIC NOT NULL,
    codigo_carrera NUMERIC NOT NULL,
    estado NUMERIC NOT NULL,
    CONSTRAINT uca_usuario_fk FOREIGN KEY(registro) REFERENCES usuario(registro),
    CONSTRAINT uca_carrera_fk FOREIGN KEY(codigo_carrera) REFERENCES carrera(codigo_carrera),
    CONSTRAINT uca_usuario_carrera_pk PRIMARY KEY(codigo_u_ca)
);

CREATE TABLE usuario_ciencia(
    codigo_u_ci NUMERIC NOT NULL,
    registro NUMERIC NOT NULL,
    codigo_ciencia NUMERIC NOT NULL,
    estado NUMERIC NOT NULL,
    CONSTRAINT uci_usuario_fk FOREIGN KEY(registro) REFERENCES usuario(registro),
    CONSTRAINT uci_ciencia_fk FOREIGN KEY(codigo_ciencia) REFERENCES ciencia(codigo_ciencia),
    CONSTRAINT uci_usuario_ciencia_pk PRIMARY KEY(codigo_u_ci)
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
DELETE facultad WHERE codigo_facultad > 6;
UPDATE facultad SET descripcion = 'Excepteur amet sit adipisicing eu aliqua aliqua sint culpa. Labore id anim cillum in magna dolor amet pariatur. Tempor mollit aliquip laborum velit consectetur elit.
Excepteur amet sit adipisicing eu ' WHERE codigo_facultad > 0;
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
        UPDATE carrera SET estado = 1 WHERE codigo_facultad = codigo_f;
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

UPDATE carrera SET estado = 0 WHERE codigo_carrera > 0;
COMMIT;

UPDATE carrera SET descripcion = 'Excepteur amet sit adipisicing eu aliqua aliqua sint culpa. Labore id anim cillum in magna dolor amet pariatur. Tempor mollit aliquip laborum velit consectetur elit.
Excepteur amet sit adipisicing eu' WHERE codigo_carrera > 0;
COMMIT;

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
        UPDATE carrera_ciencia  SET estado = 1 WHERE codigo_carrera = cod_c;
        UPDATE usuario_carrera SET estado = 1 WHERE codigo_carrera = cod_c;
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
SELECT * FROM carrera;

UPDATE ciencia SET descripcion = 'Excepteur amet sit adipisicing eu aliqua aliqua sint culpa. Labore id anim cillum in magna dolor amet pariatur. Tempor mollit aliquip laborum velit consectetur elit.
Excepteur amet sit adipisicing eu' WHERE codigo_ciencia > 0;
COMMIT;
UPDATE ciencia SET estado = 0  WHERE codigo_ciencia > 0;
COMMIT;

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
        UPDATE carrera_ciencia SET estado = 1 WHERE codigo_ciencia = cod_c;
        UPDATE usuario_ciencia SET estado = 1 WHERE codigo_ciencia = cod_c;
    END;
    
INSERT INTO carrera_ciencia(codigo_carrera, codigo_ciencia, estado) VALUES(1,1,0);
INSERT INTO carrera_ciencia(codigo_carrera, codigo_ciencia, estado) VALUES(1,3,0);
INSERT INTO carrera_ciencia(codigo_carrera, codigo_ciencia, estado) VALUES(1,4,0);
INSERT INTO carrera_ciencia(codigo_carrera, codigo_ciencia, estado) VALUES(1,5,0);
INSERT INTO carrera_ciencia(codigo_carrera, codigo_ciencia, estado) VALUES(1,17,0);
INSERT INTO carrera_ciencia(codigo_carrera, codigo_ciencia, estado) VALUES(14,6,0);
INSERT INTO carrera_ciencia(codigo_carrera, codigo_ciencia, estado) VALUES(3,7,0);
INSERT INTO carrera_ciencia(codigo_carrera, codigo_ciencia, estado) VALUES(20,8,0);
INSERT INTO carrera_ciencia(codigo_carrera, codigo_ciencia, estado) VALUES(1,2,0);
INSERT INTO carrera_ciencia(codigo_carrera, codigo_ciencia, estado) VALUES(2,2,0);
INSERT INTO carrera_ciencia(codigo_carrera, codigo_ciencia, estado) VALUES(3,2,0);
INSERT INTO carrera_ciencia(codigo_carrera, codigo_ciencia, estado) VALUES(4,2,0);
INSERT INTO carrera_ciencia(codigo_carrera, codigo_ciencia, estado) VALUES(29,2,0);
COMMIT;

SELECT * FROM carrera_ciencia;
SELECT * FROM ciencia;
SELECT * FROM carrera;
SELECT * FROM facultad;

SELECT ci.codigo_ciencia, ci.nombre,ci.descripcion, ca.nombre
FROM ciencia ci, carrera_ciencia caci, carrera ca
WHERE ci.codigo_ciencia = caci.codigo_ciencia AND ca.codigo_carrera = caci.codigo_carrera AND ci.estado = 0;

SELECT * FROM listar_ciencias WHERE codigo_ciencia = 2;

UPDATE carrera_ciencia SET estado = 0 WHERE codigo_carrera > 0;
COMMIT;
SELECT * FROM listar_ciencias;

/*CREATE OR REPLACE VIEW listar_ciencias AS 
    SELECT ci.codigo_ciencia, ci.nombre,ci.descripcion, ca.nombre "carrera", fa.nombre "facultad"
    FROM ciencia ci, carrera_ciencia caci, carrera ca, facultad fa 
    WHERE ci.codigo_ciencia = caci.codigo_ciencia 
    AND ca.codigo_carrera = caci.codigo_carrera 
    AND fa.codigo_facultad = ca.codigo_facultad
    AND ci.estado = 0
    AND caci.estado = 0*/

CREATE OR REPLACE VIEW listar_ciencias AS 
    SELECT ci.codigo_ciencia, ci.nombre,ci.descripcion, ca.nombre "carrera", ca.codigo_carrera "codigoc", fa.nombre "facultad"
    FROM carrera_ciencia caci 
    RIGHT JOIN ciencia ci ON ci.codigo_ciencia = caci.codigo_ciencia AND ci.estado = 0
    LEFT JOIN carrera ca ON ca.codigo_carrera = caci.codigo_carrera AND ca.estado = 0 AND caci.estado = 0
    LEFT JOIN facultad fa ON fa.codigo_facultad = ca.codigo_facultad AND fa.estado = 0
    
CREATE OR REPLACE PROCEDURE Insertar_Carrera_Ciencia(codigo_ca IN NUMERIC, codigo_ci IN NUMERIC)    
IS 
    BEGIN
        INSERT INTO carrera_ciencia(codigo_carrera, codigo_ciencia, estado) VALUES(codigo_ca, codigo_ci, 0);
    END;
    
CREATE OR REPLACE PROCEDURE Eliminar_Carrera_Ciencia(codigo_ca IN NUMERIC, codigo_ci IN NUMERIC)
IS 
    BEGIN
        UPDATE carrera_ciencia SET estado = 1 WHERE codigo_carrera = codigo_ca AND codigo_ciencia = codigo_ci;
    END;
    
BEGIN
    Insertar_Carrera_Ciencia(2,1426);
END;
COMMIT;

BEGIN
    Eliminar_Carrera_Ciencia(2,1426);
END;
COMMIT;

DELETE FROM carrera_ciencia WHERE codigo_carrera = 10 AND codigo_ciencia = 2;
COMMIT;

INSERT INTO rol(nombre, estado) VALUES('Administrador', 0);
INSERT INTO rol(nombre, estado) VALUES('Estudiante', 0);
INSERT INTO rol(nombre, estado) VALUES('Catedratico', 0);
INSERT INTO rol(nombre, estado) VALUES('Auxiliar', 0);
INSERT INTO rol(nombre, estado) VALUES('Junta Directiva', 0);
COMMIT;

TRUNCATE TABLE rol;

SELECT * FROM rol; 

UPDATE rol SET estado = 0 WHERE codigo_rol > 0;
COMMIT;
UPDATE rol SET descripcion = 'Excepteur amet sit adipisicing eu aliqua aliqua sint culpa. Labore id anim cillum in magna dolor amet pariatur. Tempor mollit aliquip laborum velit consectetur elit.
Excepteur amet sit adipisicing eu ' WHERE codigo_rol > 0;
COMMIT;

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
        UPDATE usuario_rol SET estado = 1 WHERE codigo_rol = codigo_r;
    END;


INSERT INTO usuario(registro, nombre, contrasenia, correo, telefono, fotografia, estado) VALUES(000000001, 'admin', 'admin', 'admin@gmail.com', 00000001, './profile.png', 0);
INSERT INTO usuario(registro, nombre, contrasenia, correo, telefono, fotografia, estado) VALUES(000000002, 'estudiante', '1234', 'estudiante@gmail.com', 00000002, './profile.png', 0);
INSERT INTO usuario(registro, nombre, contrasenia, correo, telefono, fotografia, estado) VALUES(000000003, 'catedratico', '1234', 'catedratico@gmail.com', 00000003, './profile.png', 0);
INSERT INTO usuario(registro, nombre, contrasenia, correo, telefono, fotografia, estado) VALUES(000000004, 'auxiliar', '1234', 'auxiliar@gmail.com', 00000004, './profile.png', 0);
INSERT INTO usuario(registro, nombre, contrasenia, correo, telefono, fotografia, estado) VALUES(201709362, 'Bruno Coronado', '23111997', 'bcoronado.morales@gmail.com', 51107613, './profile.png', 0);
INSERT INTO usuario(registro, nombre, contrasenia, correo, telefono, fotografia, estado) VALUES(201708362, 'Luis Coronado', '52669476', 'luisCor@gmail.com',52669476, './profile.png', 0);
INSERT INTO usuario(registro, nombre, contrasenia, correo, telefono, fotografia, estado) VALUES(201707362, 'Beatriz Morales', '58384314', 'orugagreen@gmail.com',58384314, './profile.png', 0);
INSERT INTO usuario(registro, nombre, contrasenia, correo, telefono, fotografia, estado) VALUES(201706362, 'Minino Bigotes', 'croquetas', 'bigotes@gmail.com', 95265082, './profile.png', 0);

SELECT * FROM usuario;

DELETE FROM usuario WHERE registro > 0;


CREATE OR REPLACE PROCEDURE Eliminar_Usuario (registro_u IN NUMERIC)
IS 
    BEGIN
        UPDATE usuario SET estado = 1 WHERE registro = registro_u;
        UPDATE usuario_rol SET estado = 1 WHERE registro = registro_u;
        UPDATE usuario_carrera SET estado = 1 WHERE registro = registro_u;
        UPDATE usuario_ciencia SET estado = 1 WHERE registro = registro_u;
    END;

CREATE OR REPLACE PROCEDURE Insertar_Usuario(registro_u IN NUMERIC, nombre_u IN VARCHAR2, contrasenia_u IN VARCHAR2, correo_u IN VARCHAR2, telefono_u IN NUMERIC)
IS
    BEGIN
        INSERT INTO usuario(registro, nombre, contrasenia, correo, telefono, fotografia, estado) VALUES(registro_u, nombre_u, contrasenia_u, correo_u, telefono_u, './profile.png', 0);
    END;

CREATE OR REPLACE PROCEDURE Actualizar_Usuario(registro_u IN NUMERIC, nombre_u IN VARCHAR2, contrasenia_u IN VARCHAR2, correo_u IN VARCHAR2, telefono_u IN NUMERIC, fotografia_u IN VARCHAR2)
IS 
    BEGIN
        UPDATE usuario SET nombre = nombre_u, contrasenia = contrasenia_u, correo = correo_u, telefono = telefono_u, fotografia = fotografia_u WHERE registro = registro_u;
    END;
    
SELECT * FROM usuario;

BEGIN 
    actualizar_usuario(3, 'catedratico', '1234','catedratico@gmail.com', 12345678, 'profile.png');
END;
ROLLBACK;

SELECT * FROM rol;
SELECT * FROM usuario_rol;
DELETE usuario_rol WHERE codigo_u_r = 9;

INSERT INTO usuario_rol(registro, codigo_rol, estado) VALUES(000000001,8,0);
INSERT INTO usuario_rol(registro, codigo_rol, estado) VALUES(000000001,9,0);
INSERT INTO usuario_rol(registro, codigo_rol, estado) VALUES(000000001,10,0);
INSERT INTO usuario_rol(registro, codigo_rol, estado) VALUES(000000001,11,0);
INSERT INTO usuario_rol(registro, codigo_rol, estado) VALUES(000000002,9,0);
INSERT INTO usuario_rol(registro, codigo_rol, estado) VALUES(000000003,10,0);
INSERT INTO usuario_rol(registro, codigo_rol, estado) VALUES(000000004,11,0);
INSERT INTO usuario_rol(registro, codigo_rol, estado) VALUES(201709362,9,0);
INSERT INTO usuario_rol(registro, codigo_rol, estado) VALUES(201708362,10,0);
INSERT INTO usuario_rol(registro, codigo_rol, estado) VALUES(201707362,9,0);
INSERT INTO usuario_rol(registro, codigo_rol, estado) VALUES(201706362,10,0);

CREATE OR REPLACE PROCEDURE Insertar_Usuario_Rol(registro_u IN NUMERIC, codigo_r IN NUMERIC)
IS 
    BEGIN
        INSERT INTO usuario_rol(registro, codigo_rol, estado)  VALUES(registro_u, codigo_r, 0);
    END;

CREATE OR REPLACE PROCEDURE Eliminar_Usuario_Rol(registro_u IN NUMERIC, codigo_r IN NUMERIC)
IS 
    BEGIN
        UPDATE usuario_rol SET estado = 1 WHERE registro = registro_u AND codigo_rol = codigo_r;
    END;

SELECT * FROM carrera;        
SELECT * FROM usuario_carrera;

INSERT INTO usuario_carrera(registro, codigo_carrera, estado) VALUES(000000002,1,0);
INSERT INTO usuario_carrera(registro, codigo_carrera, estado) VALUES(000000002,4,0);
INSERT INTO usuario_carrera(registro, codigo_carrera, estado) VALUES(000000003,4,0);
INSERT INTO usuario_carrera(registro, codigo_carrera, estado) VALUES(000000003,11,0);
INSERT INTO usuario_carrera(registro, codigo_carrera, estado) VALUES(000000003,29,0);
INSERT INTO usuario_carrera(registro, codigo_carrera, estado) VALUES(000000003,12,0);
INSERT INTO usuario_carrera(registro, codigo_carrera, estado) VALUES(000000004,1,0);
INSERT INTO usuario_carrera(registro, codigo_carrera, estado) VALUES(000000004,13,0);
INSERT INTO usuario_carrera(registro, codigo_carrera, estado) VALUES(201709362,1,0);
INSERT INTO usuario_carrera(registro, codigo_carrera, estado) VALUES(201708362,2,0);
INSERT INTO usuario_carrera(registro, codigo_carrera, estado) VALUES(201707362,3,0);
INSERT INTO usuario_carrera(registro, codigo_carrera, estado) VALUES(201706362,4,0);

SELECT * FROM ciencia;
SELECT * FROM usuario_ciencia;

CREATE OR REPLACE PROCEDURE Insertar_Usuario_Carrera(registro_u IN NUMERIC, codigo_c IN NUMERIC)
IS 
    BEGIN   
        INSERT INTO usuario_carrera(registro, codigo_carrera, estado) VALUES(registro_u, codigo_c, 0);    
    END;

CREATE OR REPLACE PROCEDURE Eliminar_Usuario_Carrera(registro_u IN NUMERIC, codigo_c IN NUMERIC)
IS 
    BEGIN
        UPDATE usuario_carrera SET estado = 1 WHERE registro = registro_u AND codigo_carrera = codigo_c;
    END;

INSERT INTO usuario_ciencia(registro, codigo_ciencia, estado) VALUES(000000003,2,0);
INSERT INTO usuario_ciencia(registro, codigo_ciencia, estado) VALUES(201708362,2,0);
INSERT INTO usuario_ciencia(registro, codigo_ciencia, estado) VALUES(201706362,2,0);
COMMIT;

UPDATE usuario_ciencia SET estado = 0 WHERE codigo_u_ci > 0;
COMMIT;

CREATE OR REPLACE PROCEDURE Insertar_Usuario_Ciencia(registro_u IN NUMERIC, codigo_c IN NUMERIC)
IS  
    BEGIN
        INSERT INTO usuario_ciencia(registro, codigo_ciencia, estado) VALUES(registro_u, codigo_c, 0);        
    END;
    
CREATE OR REPLACE PROCEDURE Eliminar_Usuario_Ciencia(registro_u IN NUMERIC, codigo_c IN NUMERIC)
IS 
    BEGIN
        UPDATE usuario_ciencia SET estado = 1 WHERE registro = registro_u AND codigo_ciencia = codigo_c;
    END;

SELECT u.registro, u.nombre, u.correo, u.telefono, u.fotografia, r.nombre "rol", r.codigo_rol
FROM usuario_rol ur, usuario_carrera uca, usuario_ciencia uci
RIGHT JOIN usuario u ON ur.registro = u.registro AND u.estado = 0
INNER JOIN rol r ON ur.codigo_rol = r.codigo_rol AND r.estado = 0

CREATE OR REPLACE VIEW listar_usuarios AS
SELECT u.contrasenia, u.registro, u.nombre, u.correo, u.telefono, u.fotografia, r.nombre "rol", r.codigo_rol, ca.nombre "carrera", ca.codigo_carrera, ci.nombre "ciencia", ci.codigo_ciencia, fa.nombre "facultad", fa.codigo_facultad
FROM usuario u
LEFT JOIN usuario_rol ur ON ur.registro = u.registro AND ur.estado = 0
LEFT JOIN rol r ON ur.codigo_rol = r.codigo_rol AND r.estado = 0
LEFT JOIN usuario_carrera uca ON uca.registro = u.registro AND uca.estado = 0
LEFT JOIN carrera ca ON uca.codigo_carrera = ca.codigo_carrera AND ca.estado = 0
LEFT JOIN usuario_ciencia uci ON uci.registro = u.registro AND uci.estado = 0
LEFT JOIN ciencia ci ON uci.codigo_ciencia = ci.codigo_ciencia AND ci.estado = 0
LEFT JOIN facultad fa ON fa.codigo_facultad = ca.codigo_facultad AND fa.estado = 0
WHERE u.estado = 0

SELECT * FROM listar_usuarios;
SELECT * FROM usuario_carrera;
SELECT * FROM usuario_rol;
SELECT * FROM usuario_ciencia;
SELECT * FROM listar_usuarios WHERE registro = 3;

SELECT * FROM usuario;

UPDATE usuario SET estado = 0 WHERE registro > 0;
UPDATE usuario_rol SET estado = 0 WHERE codigo_u_r > 0;
UPDATE usuario_carrera SET estado = 0 WHERE codigo_u_ca > 0;
UPDATE usuario_ciencia SET estado = 0 WHERE codigo_u_ci > 0;
COMMIT;


