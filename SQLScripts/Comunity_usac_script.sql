CREATE SEQUENCE rol_registro_sequence;
CREATE SEQUENCE ca_ci_registro_sequence;
CREATE SEQUENCE u_r_registro_sequence;
CREATE SEQUENCE u_ca_registro_sequence;
CREATE SEQUENCE u_ci_registro_sequence;
CREATE SEQUENCE tema_registro_sequence;
CREATE SEQUENCE multimedia_registro_sequence;
CREATE SEQUENCE r_t_registro_sequence;
CREATE SEQUENCE categoria_registro_sequence;
CREATE SEQUENCE examen_registro_sequence;
CREATE SEQUENCE log_examen_registro_sequence;
CREATE SEQUENCE pregunta_registro_sequence;
CREATE SEQUENCE respuesta_registro_sequence;
CREATE SEQUENCE conversacion_registro_sequence;
CREATE SEQUENCE mc_registro_sequence;

DROP SEQUENCE rol_registro_sequence;
DROP SEQUENCE tema_registro_sequence;
DROP SEQUENCE multimedia_sequence;
DROP SEQUENCE respuesta_tema_sequence;
DROP SEQUENCE categoria_sequence;

DROP SEQUENCE pr_registro_sequence;
DROP SEQUENCE pe_registro_sequence;
    
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

CREATE OR REPLACE TRIGGER tema_registro_trg BEFORE INSERT ON tema
    FOR EACH ROW
        BEGIN
            SELECT tema_registro_sequence.nextval
            INTO :new.codigo_tema
            FROM dual;
        END;    
        
CREATE OR REPLACE TRIGGER multimedia_registro_trg BEFORE INSERT ON multimedia
    FOR EACH ROW
        BEGIN
            SELECT multimedia_registro_sequence.nextval
            INTO :new.codigo_multimedia
            FROM dual;
        END;            
        
CREATE OR REPLACE TRIGGER categoria_registro_trg BEFORE INSERT ON categoria
    FOR EACH ROW
        BEGIN
            SELECT categoria_registro_sequence.nextval
            INTO :new.codigo_categoria
            FROM dual;
        END;            
 
 CREATE OR REPLACE TRIGGER r_t_registro_trg BEFORE INSERT ON respuesta_tema
    FOR EACH ROW
        BEGIN
            SELECT r_t_registro_sequence.nextval
            INTO :new.codigo_respuesta
            FROM dual;
        END;                   
        
CREATE SEQUENCE examen_registro_sequence;
CREATE SEQUENCE log_examen_registro_sequence;
CREATE SEQUENCE pregunta_registro_sequence;
CREATE SEQUENCE respuesta_registro_sequence;
CREATE SEQUENCE pr_registro_sequence;
CREATE SEQUENCE pe_registro_sequence;
        
CREATE OR REPLACE TRIGGER examen_registro_trg BEFORE INSERT ON examen
    FOR EACH ROW
        BEGIN
            SELECT examen_registro_sequence.nextval
            INTO :new.codigo_examen
            FROM dual;
        END;                           
 
 CREATE OR REPLACE TRIGGER log_examen_registro_trg BEFORE INSERT ON log_examen
    FOR EACH ROW
        BEGIN
            SELECT log_examen_registro_sequence.nextval
            INTO :new.codigo_log_examen
            FROM dual;
        END;                                  
  
CREATE OR REPLACE TRIGGER pregunta_registro_trg BEFORE INSERT ON pregunta
    FOR EACH ROW
        BEGIN
            SELECT pregunta_registro_sequence.nextval
            INTO :new.codigo_pregunta
            FROM dual;
        END;                                        
 
CREATE OR REPLACE TRIGGER respuesta_registro_trg BEFORE INSERT ON respuesta
    FOR EACH ROW
        BEGIN
            SELECT respuesta_registro_sequence.nextval
            INTO :new.codigo_respuesta
            FROM dual;
        END;                                        

CREATE OR REPLACE TRIGGER pr_registro_trg BEFORE INSERT ON pregunta_respuesta
    FOR EACH ROW
        BEGIN
            SELECT pr_registro_sequence.nextval
            INTO :new.codigo_pr
            FROM dual;
        END;                    
        
CREATE OR REPLACE TRIGGER pe_registro_trg BEFORE INSERT ON pregunta_examen
    FOR EACH ROW
        BEGIN
            SELECT pe_registro_sequence.nextval
            INTO :new.codigo_pe
            FROM dual;
        END;  
        
CREATE OR REPLACE TRIGGER conversacion_registro_trg BEFORE INSERT ON conversacion
    FOR EACH ROW
        BEGIN
            SELECT conversacion_registro_sequence.nextval
            INTO :new.codigo_conversacion
            FROM dual;
        END;           

CREATE OR REPLACE TRIGGER mc_registro_trg BEFORE INSERT ON mensaje_conversacion
    FOR EACH ROW
        BEGIN
            SELECT mc_registro_sequence.nextval
            INTO :new.codigo_mensaje
            FROM dual;
        END;       

DROP TRIGGER pr_registro_trg;     
DROP TRIGGER pe_registro_trg;     
            
DROP TRIGGER rol_registro_trg;
DROP TRIGGER r_t_registro_trg;

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

CREATE TABLE tema(
    codigo_tema NUMERIC NOT NULL,
    titulo VARCHAR2(100) NOT NULL,
    descripcion VARCHAR2(1000) NOT NULL,
    fecha_creacion VARCHAR(25) NOT NULL,
    registro_usuario_creacion NUMERIC NOT NULL,
    estado NUMERIC NOT NULL,
    fecha_clausura VARCHAR(25),
    registro_usuario_clausura NUMERIC,
    razon_clausura VARCHAR(200),
    CONSTRAINT tema_pk PRIMARY KEY(codigo_tema),
    CONSTRAINT t_usr_creacion_fk FOREIGN KEY(registro_usuario_creacion) REFERENCES usuario(registro),
    CONSTRAINT t_usr_clausura_fk FOREIGN KEY(registro_usuario_clausura) REFERENCES usuario(registro)
);

CREATE TABLE categoria(
    codigo_categoria NUMERIC NOT NULL,
    codigo_tema NUMERIC NOT NULL,
    codigo_facultad NUMERIC,
    codigo_carrera NUMERIC,
    codigo_ciencia NUMERIC,
    estado NUMERIC NOT NULL,
    CONSTRAINT categoria_pk PRIMARY KEY(codigo_categoria, codigo_tema),
    CONSTRAINT cat_facultad_fk FOREIGN KEY(codigo_facultad) REFERENCES facultad(codigo_facultad),
    CONSTRAINT cat_carrera_fk FOREIGN KEY(codigo_carrera) REFERENCES carrera(codigo_carrera),
    CONSTRAINT cat_ciencia_fk FOREIGN KEY(codigo_ciencia) REFERENCES ciencia(codigo_ciencia)
);

DROP TABLE categoria;

CREATE TABLE respuesta_tema(
    codigo_respuesta NUMERIC NOT NULL,
    contenido VARCHAR2(1000) NULL,
    codigo_tema NUMERIC NOT NULL,
    registro_usuario NUMERIC NOT NULL,
    estado NUMERIC NOT NULL,
    CONSTRAINT respuesta_tema_pk PRIMARY KEY(codigo_respuesta) ,
    CONSTRAINT r_t_tema FOREIGN KEY(codigo_tema) REFERENCES tema(codigo_tema),
    CONSTRAINT r_t_usuario FOREIGN KEY(registro_usuario) REFERENCES usuario(registro)
);

DROP TABLE respuesta_tema;

CREATE TABLE multimedia(
    codigo_multimedia NUMERIC NOT NULL,
    codigo_tema NUMERIC,
    codigo_respuesta_tema NUMERIC,
    contenido VARCHAR(1000) NOT NULL,
    estado NUMERIC NOT NULL,
    CONSTRAINT multimedia_pk PRIMARY KEY(codigo_multimedia),
    CONSTRAINT m_tema_fk FOREIGN KEY(codigo_tema) REFERENCES tema(codigo_tema),
    CONSTRAINT m_respuesta_tema_fk FOREIGN KEY(codigo_respuesta_tema)  REFERENCES respuesta_tema(codigo_respuesta)
);

CREATE TABLE examen(
    codigo_examen NUMERIC NOT NULL,
    titulo VARCHAR2(250) NOT NULL,
    tema VARCHAR2(250) NOT NULL,
    fecha_creacion VARCHAR2(50) NOT NULL,
    codigo_usuario_ciencia NUMERIC NOT NULL,
    estado NUMERIC NOT NULL,
    CONSTRAINT examen_pk PRIMARY KEY(codigo_examen),
    CONSTRAINT uci_examen_fk FOREIGN KEY(codigo_usuario_ciencia) REFERENCES usuario_ciencia(codigo_u_ci)
);

CREATE TABLE log_examen(
    codigo_log_examen NUMERIC NOT NULL,
    codigo_examen NUMERIC NOT NULL,
    fecha_modificacion VARCHAR2(75),
    CONSTRAINT log_examen_pk PRIMARY KEY(codigo_log_examen),
    CONSTRAINT log_examen_fk FOREIGN KEY(codigo_examen) REFERENCES examen(codigo_examen)
);

CREATE TABLE pregunta(
    codigo_pregunta NUMERIC NOT NULL,
    contenido VARCHAR2(500) NOT NULL,
    tipo NUMERIC NOT NULL,
    codigo_examen NUMERIC NOT NULL,
    estado NUMERIC NOT NULL,
    CONSTRAINT pregunta_pk PRIMARY KEY(codigo_pregunta),
    CONSTRAINT pe_fk FOREIGN KEY(codigo_examen) REFERENCES examen(codigo_examen)
);

DROP TABLE pregunta;

CREATE TABLE respuesta(
    codigo_respuesta NUMERIC NOT NULL,
    contenido VARCHAR2(500) NOT NULL,
    valor NUMERIC NOT NULL,
    codigo_pregunta NUMERIC NOT NULL,
    estado NUMERIC NOT NULL,
    CONSTRAINT respuesta_pk PRIMARY KEY(codigo_respuesta),
    CONSTRAINT pr_fk FOREIGN KEY(codigo_pregunta) REFERENCES pregunta(codigo_pregunta)
);

DROP TABLE respuesta;

CREATE TABLE pregunta_respuesta(
    codigo_pr NUMERIC NOT NULL,
    codigo_pregunta NUMERIC NOT NULL,
    codigo_respuesta NUMERIC NOT NULL,
    valor NUMERIC NOT NULL,
    estado NUMERIC NOT NULL,
    CONSTRAINT pr_pk PRIMARY KEY(codigo_pr),
    CONSTRAINT pr_pregunta_fk FOREIGN KEY(codigo_pregunta) REFERENCES pregunta(codigo_pregunta),
    CONSTRAINT pr_respuesta_fk FOREIGN KEY(codigo_respuesta) REFERENCES respuesta(codigo_respuesta)
);

DROP TABLE pregunta_respuesta;

CREATE TABLE pregunta_examen(
    codigo_pe NUMERIC NOT NULL,
    codigo_examen NUMERIC NOT NULL,
    codigo_pregunta NUMERIC NOT NULL,
    estado NUMERIC NOT NULL,
    CONSTRAINT pe_pk PRIMARY KEY(codigo_pe),
    CONSTRAINT pe_examen_fk FOREIGN KEY(codigo_examen) REFERENCES examen(codigo_examen),
    CONSTRAINT pe_pregunta_fk FOREIGN KEY(codigo_pregunta) REFERENCES pregunta(codigo_pregunta)
);

CREATE TABLE conversacion(
    codigo_conversacion NUMERIC NOT NULL,
    registro_emisor NUMERIC NOT NULL,
    registro_receptor NUMERIC  NOT NULL,
    estado NUMERIC NOT NULL,
    CONSTRAINT conversacion_pk PRIMARY KEY(codigo_conversacion),
    CONSTRAINT c_emisor_fk FOREIGN KEY(registro_emisor) REFERENCES usuario(registro),
    CONSTRAINT c_receptor_fk FOREIGN KEY(registro_receptor) REFERENCES usuario(registro)
);

CREATE TABLE mensaje_conversacion(
    codigo_mensaje NUMERIC NOT NULL,
    contenido VARCHAR(2000) NOT NULL,
    registro_emisor NUMERIC NOT NULL,
    registro_receptor NUMERIC NOT NULL,
    codigo_conversacion NUMERIC NOT NULL,
    estado NUMERIC NOT NULL,
    CONSTRAINT mensaje_conversacion_pk PRIMARY KEY(codigo_mensaje),
    CONSTRAINT mc_emisor_fk FOREIGN KEY(registro_emisor) REFERENCES usuario(registro),
    CONSTRAINT mc_receptor_fk FOREIGN KEY(registro_receptor) REFERENCES usuario(registro),
    CONSTRAINT mc_conversacion_fk FOREIGN KEY(codigo_conversacion) REFERENCES conversacion(codigo_conversacion)
);

DROP TABLE mensaje_conversacion;


DROP TABLE pregunta_examen;

DROP TABLE Multimedia;

DROP TABLE facultad;
DROP TABLE carrera;
DROP TABLE ciencia;
DROP TABLE rol;
DROP TABLE usuario;
DROP TABLE usuario_rol;
DROP TABLE usuario_facultad;
DROP TABLE usuario_carrera;
DROP TABLE tema;

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

DELETE FROM carrera_ciencia WHERE codigo_carrera = 1 AND codigo_ciencia = 2;
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

/*CREATE OR REPLACE VIEW listar_usuarios AS
SELECT u.contrasenia, u.registro, u.nombre, u.correo, u.telefono, u.fotografia, r.nombre "rol", r.codigo_rol, ca.nombre "carrera", ca.codigo_carrera, ci.nombre "ciencia", ci.codigo_ciencia, fa.nombre "facultad", fa.codigo_facultad
FROM usuario u
LEFT JOIN usuario_rol ur ON ur.registro = u.registro AND ur.estado = 0
LEFT JOIN rol r ON ur.codigo_rol = r.codigo_rol AND r.estado = 0
LEFT JOIN usuario_carrera uca ON uca.registro = u.registro AND uca.estado = 0
LEFT JOIN carrera ca ON uca.codigo_carrera = ca.codigo_carrera AND ca.estado = 0
LEFT JOIN facultad fa ON fa.codigo_facultad = ca.codigo_facultad AND fa.estado = 0
LEFT JOIN usuario_ciencia uci ON uci.registro = u.registro AND uci.estado = 0
LEFT JOIN ciencia ci ON uci.codigo_ciencia = ci.codigo_ciencia AND ci.estado = 0
WHERE u.estado = 0*/

CREATE OR REPLACE VIEW listar_usuarios AS
SELECT u.contrasenia, u.registro, u.nombre, u.correo, u.telefono, u.fotografia, r.nombre "rol", r.codigo_rol, ca.nombre "carrera", ca.codigo_carrera, ci.nombre "ciencia", ci.codigo_ciencia, fa.nombre "facultad", fa.codigo_facultad
FROM usuario u
LEFT JOIN usuario_rol ur ON ur.registro = u.registro AND ur.estado = 0
LEFT JOIN rol r ON ur.codigo_rol = r.codigo_rol AND r.estado = 0
LEFT JOIN usuario_carrera uca ON uca.registro = u.registro AND uca.estado = 0
LEFT JOIN carrera ca ON uca.codigo_carrera = ca.codigo_carrera AND ca.estado = 0
LEFT JOIN carrera_ciencia caci ON caci.codigo_carrera = ca.codigo_carrera AND caci.estado = 0
LEFT JOIN facultad fa ON fa.codigo_facultad = ca.codigo_facultad AND fa.estado = 0
LEFT JOIN usuario_ciencia uci ON uci.registro = u.registro AND uci.estado = 0
LEFT JOIN ciencia ci ON uci.codigo_ciencia = ci.codigo_ciencia AND ci.estado = 0 AND  caci.codigo_ciencia = ci.codigo_ciencia 
WHERE u.estado = 0;

SELECT * FROM listar_usuarios WHERE registro = 3;
SELECT * FROM carrera;
SELECT * FROM rol;
SELECT * FROM usuario_carrera;
SELECT * FROM usuario_rol;
SELECT * FROM usuario_ciencia;
SELECT * FROM listar_usuarios WHERE registro = 3;
SELECT * FROM usuario
DELETE FROM usuario_ciencia  WHERE estado = 1;
COMMIT;
DELETE FROM usuario WHERE contrasenia = 'delbarrio';
COMMIT;
DELETE FROM usuario_ciencia WHERE codigo_u_ci > 6;
COMMIT;

SELECT * FROM usuario;
SELECT * FROM rol;

UPDATE usuario SET estado = 0 WHERE registro > 0;
UPDATE usuario_rol SET estado = 0 WHERE codigo_u_r > 0;
UPDATE usuario_carrera SET estado = 0 WHERE codigo_u_ca > 0;
UPDATE usuario_ciencia SET estado = 0 WHERE codigo_u_ci > 0;
COMMIT;

SELECT * FROM usuario_rol WHERE registro = 3;

SELECT *
FROM usuario u, usuario_rol ur
WHERE ur.registro = u.registro
AND u.registro = 3
AND ur.codigo_rol = 10
AND ur.estado = 0
AND  u.contrasenia = '1234'
    
DELETE FROM tema WHERE codigo_TEMA > 0;        
COMMIT;
SELECT * FROM tema;    
ROLLBACK

DROP function  Crear_Tema;

CREATE OR REPLACE PROCEDURE Crear_Tema(titulo_t IN VARCHAR2, descripcion_t IN VARCHAR2, registro_c IN NUMERIC)
IS
    BEGIN
        INSERT INTO tema(titulo, descripcion, fecha_creacion, registro_usuario_creacion, estado) VALUES(titulo_t, descripcion_t, SYSDATE, registro_c, 0);
    END;

SELECT tema_registro_sequence.currval FROM dual;

SELECT max(codigo_tema) FROM tema WHERE registro_usuario_creacion = 3;

SELECT * FROM multimedia;

CREATE OR REPLACE PROCEDURE Crear_Multimedia_Tema(codigo_t IN NUMERIC, contenido_m IN VARCHAR2)
IS 
    BEGIN
        INSERT INTO multimedia(codigo_tema, contenido, estado) VALUES(codigo_t, contenido_m, 0);
    END;
    
CREATE OR REPLACE PROCEDURE Eliminar_Multimedia_Tema(codigo_m IN NUMERIC)    
IS 
    BEGIN 
        UPDATE multimedia SET estado = 1 WHERE codigo_multimedia = codigo_m;
    END;
    
SELECT * FROM categoria;    
    
CREATE OR REPLACE PROCEDURE Crear_Categoria_Facultad(codigo_t IN NUMERIC, codigo_f IN NUMERIC)
IS 
    BEGIN
        INSERT INTO categoria(codigo_tema, codigo_facultad, estado) VALUES(codigo_t, codigo_f, 0);
    END;
    
CREATE OR REPLACE PROCEDURE Crear_Categoria_Carrera(codigo_t IN NUMERIC, codigo_c IN NUMERIC)
IS 
    BEGIN
        INSERT INTO categoria(codigo_tema, codigo_carrera, estado) VALUES(codigo_t, codigo_c, 0);
    END;

CREATE OR REPLACE PROCEDURE Crear_Categoria_Ciencia(codigo_t IN NUMERIC, codigo_c IN NUMERIC)
IS 
    BEGIN
        INSERT INTO categoria(codigo_tema, codigo_ciencia, estado) VALUES(codigo_t, codigo_c, 0);
    END;
    
CREATE OR REPLACE PROCEDURE Eliminar_Categoria(codigo_cat IN NUMERIC)
IS 
    BEGIN 
        UPDATE categoria SET estado = 1 WHERE codigo_categoria = codigo_cat;
    END;    
    
SELECT * FROM respuesta_tema;    

CREATE OR REPLACE PROCEDURE Crear_Respuesta_Tema(reg_u IN NUMERIC, cod_t IN NUMERIC, contenido IN VARCHAR2)        
IS
    BEGIN
        INSERT INTO respuesta_tema(registro_usuario, codigo_tema, contenido, estado) VALUES(reg_u, cod_t, contenido, 0);
    END;

DROP PROCEDURE Crear_Respuesta;

SELECT * FROM tema;

BEGIN
    Crear_Tema('Lorem Ipsum 1', 'Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur id amet Lorem ad. Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur id amet Lorem ad. Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur id amet Lorem ad. Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur id amet Lorem ad. Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur ', 3);
    Crear_Tema('Lorem Ipsum 2', 'Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur id amet Lorem ad. Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur id amet Lorem ad. Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur id amet Lorem ad. Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur id amet Lorem ad. Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur ', 3);
END;
COMMIT;    
SELECT * FROM usuario;
SELECT * FROM respuesta_tema;
BEGIN 
    Crear_Respuesta_Tema(2, 1, 'Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur id amet Lorem ad. Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non');
    Crear_Respuesta_Tema(2, 1, 'Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur id amet Lorem ad. Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non');
    Crear_Respuesta_Tema(2, 2, 'Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur id amet Lorem ad. Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non');
END;
COMMIT;
SELECT * FROM ciencia;
SELECT * FROM carrera;
SELECT * FROM categoria;
BEGIN 
    Crear_Categoria_Facultad(1,1);
    Crear_Categoria_Carrera(1,1);   
    Crear_Categoria_Ciencia(1,3);
    Crear_Categoria_Facultad(2,1);
END;
COMMIT;

BEGIN 
    Crear_Categoria_Ciencia(1,1);
END;
COMMIT;

BEGIN 
    Crear_Categoria_Carrera(1,4);   
END;
COMMIT;


CREATE OR REPLACE VIEW info_tema AS
SELECT DISTINCT t.codigo_tema, u.nombre "autor", t.titulo, t.fecha_creacion, t.estado, rt."respuestas", t.descripcion "contenido"
FROM tema t
INNER JOIN usuario u ON t.registro_usuario_creacion = u.registro
LEFT JOIN resp_tema rt ON rt.codigo_tema = t.codigo_tema 
WHERE t.estado = 0
AND u.estado = 0

SELECT * FROM info_tema;


CREATE OR REPLACE VIEW cat_facultad AS
SELECT DISTINCT cat.codigo_categoria, cat.codigo_tema "ct_cod_tema", f.nombre "facultad"
FROM facultad f, categoria cat
WHERE f.codigo_facultad = cat.codigo_facultad
AND f.estado = 0
AND cat.estado = 0

SELECT * FROM cat_facultad;
SELECT * FROM cat_facultad WHERE "ct_cod_tema" = 1;

CREATE OR REPLACE VIEW cat_carrera AS
SELECT DISTINCT cat.codigo_categoria, cat.codigo_tema "ca_cod_tema", c.nombre "carrera"
FROM carrera c, categoria cat
WHERE c.codigo_carrera = cat.codigo_carrera
AND c.estado = 0
AND cat.estado = 0

SELECT * FROM cat_carrera
SELECT * FROM cat_carrera WHERE "ca_cod_tema" = 1;

CREATE OR REPLACE VIEW cat_ciencia AS
SELECT DISTINCT cat.codigo_categoria, cat.codigo_tema "ci_cod_tema", c.nombre "ciencia"
FROM ciencia c, categoria cat
WHERE c.codigo_ciencia = cat.codigo_ciencia
AND c.estado = 0
AND cat.estado = 0

SELECT * FROM cat_ciencia
SELECT * FROM cat_ciencia WHERE "ci_cod_tema" = 1

INNER JOIN respuesta_tema rt ON rt.codigo_tema = t.codigo_tema 
WHERE t.estado = 0
GROUP BY t.codigo_tema

CREATE OR REPLACE VIEW resp_tema AS
SELECT rt.codigo_tema, COUNT(rt.codigo_tema) AS "respuestas"
FROM respuesta_tema rt, tema t
WHERE rt.codigo_tema = t.codigo_tema 
AND rt.estado = 0
AND t.estado = 0
GROUP BY t.codigo_tema, rt.codigo_tema;

SELECT rt.codigo_tema, COUNT(rt.codigo_tema) AS "respuestas"
FROM respuesta_tema rt
RIGHT JOIN tema t ON rt.codigo_tema = t.codigo_tema 
AND rt.estado = 0
AND t.estado = 0
GROUP BY t.codigo_tema, rt.codigo_tema;

SELECT * FROM resp_tema;

SELECT contenido FROM multimedia;
SELECT contenido FROM multimedia WHERE codigo_tema = 3 AND estado = 0;


SELECT * FROM TEMA
UPDATE tema SET descripcion = 'Lorem adipisicing anim sunt eu laborum do. Eu ad amet proident non. Magna minim mollit id consequat dolor sunt reprehenderit incididunt eiusmod consectetur Lorem. Sunt l' where codigo_tema = 4;
commit;

BEGIN
    Crear_Multimedia_Tema(1, './profile.png');
    Crear_Multimedia_Tema(1, './profile.png');
    Crear_Multimedia_Tema(1, './profile.png');
    Crear_Multimedia_Tema(2, './profile.png');
    Crear_Multimedia_Tema(2, './profile.png');
    Crear_Multimedia_Tema(2, './profile.png');
    Crear_Multimedia_Tema(3, './profile.png');
    Crear_Multimedia_Tema(3, './profile.png');
    Crear_Multimedia_Tema(3, './profile.png');
    Crear_Multimedia_Tema(4, './profile.png');
    Crear_Multimedia_Tema(4, './profile.png');
    Crear_Multimedia_Tema(4, './profile.png');
    Crear_Multimedia_Tema(5, './profile.png');
    Crear_Multimedia_Tema(5, './profile.png');
    Crear_Multimedia_Tema(5, './profile.png');
    Crear_Multimedia_Tema(6, './profile.png');
    Crear_Multimedia_Tema(6, './profile.png');
    Crear_Multimedia_Tema(6, './profile.png');
END;
COMMIT;

SELECT * FROM respuesta_tema WHERE codigo_tema = 1 AND estado = 0;
SELECT * FROM usuario;


SELECT * FROM tema

CREATE OR REPLACE PROCEDURE Crear_Respuesta_Tema(reg_u IN NUMERIC, cod_t IN NUMERIC, contenido IN VARCHAR2)        



BEGIN
    Crear_Respuesta_Tema(3,1, 'Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur id amet Lorem ad. Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non');
    Crear_Respuesta_Tema(3,2, 'Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur id amet Lorem ad. Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non');
    Crear_Respuesta_Tema(3,3, 'Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur id amet Lorem ad. Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non');
    Crear_Respuesta_Tema(3,4, 'Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur id amet Lorem ad. Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non');
    Crear_Respuesta_Tema(3,5, 'Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur id amet Lorem ad. Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non');
    Crear_Respuesta_Tema(3,6, 'Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur id amet Lorem ad. Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non');
    Crear_Respuesta_Tema(3,1, 'Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur id amet Lorem ad. Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non');
    Crear_Respuesta_Tema(3,2, 'Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur id amet Lorem ad. Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non');
    Crear_Respuesta_Tema(2,3, 'Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur id amet Lorem ad. Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non');
    Crear_Respuesta_Tema(2,4, 'Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur id amet Lorem ad. Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non');
    Crear_Respuesta_Tema(2,5, 'Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur id amet Lorem ad. Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non');
    Crear_Respuesta_Tema(2,6, 'Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur id amet Lorem ad. Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non');
    Crear_Respuesta_Tema(2,1, 'Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur id amet Lorem ad. Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non');
    Crear_Respuesta_Tema(3,2, 'Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur id amet Lorem ad. Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non');
    Crear_Respuesta_Tema(3,3, 'Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur id amet Lorem ad. Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non');
    Crear_Respuesta_Tema(2,4, 'Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur id amet Lorem ad. Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non');
    Crear_Respuesta_Tema(3,5, 'Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur id amet Lorem ad. Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non');
    Crear_Respuesta_Tema(2,6, 'Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur id amet Lorem ad. Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non');
END;
COMMIT;

DELETE from respuesta_tema WHERE registro_usuario = 1
COMMIT;
SELECT * FROM respuesta_tema WHERE codigo_tema = 1 AND estado = 0;


BEGIN
    Crear_Respuesta_Tema(3,1, 'Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur id amet Lorem ad. Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non');
    Crear_Respuesta_Tema(3,2, 'Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur id amet Lorem ad. Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non');
    Crear_Respuesta_Tema(3,3, 'Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur id amet Lorem ad. Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non');
    Crear_Respuesta_Tema(3,4, 'Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur id amet Lorem ad. Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non');
    Crear_Respuesta_Tema(3,5, 'Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur id amet Lorem ad. Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non');
    Crear_Respuesta_Tema(3,6, 'Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur id amet Lorem ad. Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non');
    Crear_Respuesta_Tema(3,1, 'Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur id amet Lorem ad. Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non');
    Crear_Respuesta_Tema(3,2, 'Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur id amet Lorem ad. Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non');
    Crear_Respuesta_Tema(3,2, 'Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur id amet Lorem ad. Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non');
    Crear_Respuesta_Tema(3,3, 'Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur id amet Lorem ad. Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non');
    Crear_Respuesta_Tema(3,5, 'Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non proident magna veniam quis. Proident id Lorem minim culpa pariatur id amet Lorem ad. Sint et non non anim. Minim incididunt dolore aliquip exercitation ea et nostrud non');
END;

SELECT * FROM rol

CREATE OR REPLACE VIEW comentarios_tema AS
SELECT u.nombre "usuario", u.fotografia "fotografia", rt.contenido "contenido", rt.codigo_tema
FROM usuario u
INNER JOIN respuesta_tema rt ON u.registro = rt.registro_usuario
WHERE rt.estado = 0
AND u.estado = 0

SELECT * FROM comentarios_tema WHERE codigo_tema = 1

SELECT * FROM examen;
SELECT * FROM pregunta;
SELECT * FROM respuesta;


SELECT * FROM usuario_ciencia;
SELECT * FROM ciencia

CREATE OR REPLACE VIEW listado_usuario_ciencia AS
SELECT c.nombre, uci.codigo_u_ci, uci.registro
FROM usuario_ciencia uci
INNER JOIN ciencia c ON uci.codigo_ciencia = c.codigo_ciencia
WHERE uci.estado = 0
AND c.estado = 0;

SELECT * FROM listado_usuario_ciencia WHERE registro = 3;


SELECT * FROM usuario_ciencia;

CREATE OR REPLACE PROCEDURE crear_examen(titulo_e IN VARCHAR2, tema_e IN VARCHAR2, cod_uci_e IN NUMERIC)
IS 
    BEGIN
        INSERT INTO examen(titulo, tema, fecha_creacion, codigo_usuario_ciencia, estado) VALUES(titulo_e, tema_e, SYSDATE, cod_uci_e, 0);
    END;
    
SELECT max(codigo_examen) "codigo_examen" FROM examen WHERE codigo_usuario_ciencia = 1;

CREATE OR REPLACE PROCEDURE eliminar_examen(cod_e IN NUMERIC)
IS
    BEGIN 
        UPDATE examen SET estado = 1 WHERE codigo_examen = cod_e;
    END;
    
CREATE OR REPLACE PROCEDURE insertar_log_examen(cod_e IN NUMERIC)    
IS
    BEGIN 
        INSERT INTO log_examen(codigo_examen, fecha_modificacion) VALUES(cod_e, SYSDATE);
    END;

CREATE OR REPLACE PROCEDURE actualizar_examen(cod_e IN NUMERIC, titulo_e IN VARCHAR, tema_e IN VARCHAR2, cod_uci_e IN NUMERIC)
IS
    BEGIN
        UPDATE examen SET titulo = titulo_e, tema = tema_e, codigo_usuario_ciencia = cod_uci_e WHERE codigo_examen = cod_e;
    END;

SELECT * FROM pregunta;

CREATE OR REPLACE PROCEDURE crear_pregunta(tipo_p IN NUMERIC, contenido_p IN VARCHAR2, codigo_e IN NUMERIC)
IS 
    BEGIN
        INSERT INTO pregunta(contenido, tipo, codigo_examen, estado) VALUES(contenido_p, tipo_p, codigo_e, 0);
    END;

SELECT max(codigo_pregunta) "codigo_pregunta" FROM pregunta WHERE codigo_examen = 1;

CREATE OR REPLACE PROCEDURE eliminar_pregunta(codigo_p IN NUMERIC)
IS
    BEGIN
        UPDATE pregunta SET estado = 1 WHERE codigo_pregunta = codigo_p;
    END;

SELECT * FROM respuesta

CREATE OR REPLACE PROCEDURE crear_respuesta(contenido_r IN VARCHAR2, codigo_p IN NUMERIC, valor_r IN NUMERIC)
IS 
    BEGIN
        INSERT INTO respuesta(contenido, codigo_pregunta, valor, estado) VALUES(contenido_r, codigo_p, valor_r, 0);
    END;

CREATE OR REPLACE PROCEDURE eliminar_respuesta(codigo_r IN NUMERIC)
IS
    BEGIN
        UPDATE respuesta SET estado = 1 WHERE codigo_respuesta = codigo_r;
    END;


CREATE OR REPLACE PROCEDURE crear_pregunta_respuesta(codigo_p IN NUMERIC, codigo_r IN NUMERIC, valor_r IN NUMERIC)
IS
    BEGIN
        INSERT INTO pregunta_respuesta(codigo_pregunta, codigo_respuesta, valor, estado) VALUES(codigo_p, codigo_r, valor_r, 0);
    END;
    
DROP PROCEDURE crear_pregunta_respuesta;

CREATE OR REPLACE PROCEDURE eliminar_pregunta_respuesta(cod_pr IN NUMERIC)
IS 
    BEGIN
        UPDATE pregunta_respuesta SET estado = 0 WHERE codigo_pr = cod_pr;
    END;
    
DROP PROCEDURE eliminar_pregunta_respuesta;    

CREATE OR REPLACE PROCEDURE crear_pregunta_examen(codigo_e IN NUMERIC, codigo_p IN NUMERIC)
IS 
    BEGIN
        INSERT INTO pregunta_examen(codigo_examen, codigo_pregunta, estado) VALUES(codigo_e, codigo_p, 0);
    END;
    
DROP PROCEDURE crear_pregunta_examen;        
    
CREATE OR REPLACE PROCEDURE eliminar_pregunta_examen(cod_pe IN NUMERIC)
IS
    BEGIN
        UPDATE pregunta_examen SET estado = 1 WHERE codigo_pe = cod_pe;
    END;

DROP PROCEDURE eliminar_pregunta_examen;        


SELECT * FROM conversacion;
SELECT * FROM mensaje_conversacion;

UPDATE conversacion SET estado = 0 WHERE codigo_conversacion > 0;
COMMIT;

CREATE OR REPLACE PROCEDURE crear_conversacion(reg_e IN NUMERIC, reg_r IN NUMERIC)
IS
    BEGIN
        INSERT INTO conversacion(registro_emisor, registro_receptor, estado) VALUES(reg_e, reg_r, 0);
    END;
    
SELECT MAX(codigo_conversacion) "codigo_conversacion" FROM conversacion WHERE registro_emisor = 1 AND registro_receptor = 1;
    
CREATE OR REPLACE PROCEDURE eliminar_conversacion(cod_c IN NUMERIC)    
IS
    BEGIN
        UPDATE conversacion SET estado = 1 WHERE codigo_conversacion = cod_c;    
        UPDATE mensaje_conversacion SET estado = 1 WHERE codigo_conversacion = cod_c;
    END;
    
CREATE OR REPLACE PROCEDURE crear_mensaje(reg_e IN NUMERIC, reg_r IN NUMERIC, cod_c IN NUMERIC, cont IN VARCHAR2)
IS
    BEGIN
        INSERT INTO mensaje_conversacion(registro_emisor, registro_receptor, codigo_conversacion, contenido, estado) VALUES(reg_e, reg_r, cod_c, cont, 0);
    END;

CREATE OR REPLACE VIEW info_conversaciones AS        
SELECT c.codigo_conversacion, c.registro_emisor, e.nombre  "emisor", c.registro_receptor, r.nombre "receptor"
FROM conversacion c
INNER JOIN usuario e ON c.registro_emisor = e.registro AND e.estado = 0
INNER JOIN usuario r ON c.registro_receptor = r.registro AND r.estado = 0
AND c.estado = 0;

SELECT * FROM info_conversaciones WHERE registro_emisor = 3 OR registro_receptor = 3;

SELECT COUNT(codigo_mensaje)
FROM mensaje_conversacion
WHERE estado = 0
ORDER BY(codigo_conversacion);








