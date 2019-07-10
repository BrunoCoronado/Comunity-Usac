/*ESTADISTICAS*/

/*TOTAL RESPUESTAS TEMA POR USUARIO FILTRADO POR ROL Y CON INFORMACION DE USUARIO*/ 
CREATE OR REPLACE VIEW top_respuestas_usuarios AS
SELECT DISTINCT ur.codigo_rol, u.registro, u.nombre, u.fotografia, ru."respuestas"
FROM respuesta_tema rt
INNER JOIN usuario u ON rt.registro_usuario = u.registro AND u.estado = 0
INNER JOIN usuario_rol ur ON ur.registro = u.registro AND ur.estado = 0
INNER JOIN respuestas_usuario ru ON ru.registro_usuario = u.registro
WHERE rt.estado = 0
ORDER BY ru."respuestas" DESC;

/*TOTAL RESPUESTAS TEMA POR USUARIO*/ 
CREATE OR REPLACE VIEW respuestas_usuario AS 
SELECT rt.registro_usuario, COUNT(rt.codigo_respuesta) AS "respuestas"
FROM respuesta_tema rt 
INNER JOIN usuario u ON rt.registro_usuario = u.registro AND u.estado = 0
WHERE rt.estado = 0
GROUP BY rt.registro_usuario, u.registro;

/*TOP 3 CATEDRATICO CON MAS RESPUESTAS*/  
SELECT * FROM top_respuestas_usuarios WHERE codigo_rol = 3 AND ROWNUM < 4;
/*TOP 10 ESTUDIANTES CON MAS RESPUESTAS CON MAS RESPUESTAS*/  
SELECT * FROM top_respuestas_usuarios WHERE codigo_rol = 2 AND ROWNUM < 11;
  
/*TOTAL RESPUESTAS TEMA Y CATEGORIA POR USUARIO FILTRADO POR ROL Y CON INFORMACION DE USUARIO*/ 
CREATE OR REPLACE VIEW top_resp_ciencia_usuarios AS
SELECT DISTINCT c.codigo_ciencia, ur.codigo_rol, u.registro, u.nombre, u.fotografia, ru."respuestas"
FROM respuesta_tema rt
INNER JOIN usuario u ON rt.registro_usuario = u.registro AND u.estado = 0
INNER JOIN usuario_rol ur ON ur.registro = u.registro AND ur.estado = 0
INNER JOIN categoria c ON rt.codigo_tema = c.codigo_tema AND c.codigo_ciencia IS NOT NULL AND c.estado = 0
INNER JOIN respuestas_usuario_ciencia ru ON ru.registro_usuario = u.registro AND ru.codigo_ciencia = c.codigo_ciencia
WHERE rt.estado = 0
ORDER BY ru."respuestas" DESC;
  
/*TOTAL RESPUESTAS TEMA POR USUARIO Y CIENCIA*/ 
CREATE OR REPLACE VIEW respuestas_usuario_ciencia AS 
SELECT DISTINCT c.codigo_ciencia, rt.registro_usuario, COUNT(rt.codigo_respuesta) AS "respuestas"
FROM respuesta_tema rt 
INNER JOIN usuario u ON rt.registro_usuario = u.registro AND u.estado = 0
INNER JOIN categoria c ON c.codigo_tema = rt.codigo_tema AND c.codigo_ciencia IS NOT NULL AND c.estado = 0
WHERE rt.estado = 0
GROUP BY rt.registro_usuario, u.registro, c.codigo_ciencia;  

/*TOP 3 CATEDRATICO CON MAS RESPUESTAS EN CIENCIA ESPECIFICA*/  
SELECT * FROM top_resp_ciencia_usuarios WHERE codigo_rol = 3 AND codigo_ciencia = 2 AND ROWNUM < 4;
/*TOP 10 ESTUDIANTES CON MAS RESPUESTAS CON MAS RESPUESTAS EN CIENCIA ESPECIFICA*/  
SELECT * FROM top_resp_ciencia_usuarios WHERE codigo_rol = 2 AND codigo_ciencia = 2 AND ROWNUM < 11;

/********************************************************************************************/

/*TOTAL RESPUESTAS DE TEMAS POR CIENCIA*/ 
CREATE OR REPLACE VIEW respuestas_ciencia AS 
SELECT DISTINCT rt.codigo_tema, c.codigo_ciencia, ci.nombre, COUNT(rt.codigo_tema) AS "respuestas"
FROM respuesta_tema rt
INNER JOIN tema t ON rt.codigo_tema = t.codigo_tema 
INNER JOIN categoria c ON c.codigo_tema = t.codigo_tema AND c.codigo_ciencia IS NOT NULL AND c.estado = 0
INNER JOIN ciencia ci ON c.codigo_ciencia = ci.codigo_ciencia AND ci.estado = 0
WHERE rt.estado = 0
AND t.estado <> 2
GROUP BY t.codigo_tema, rt.codigo_tema, c.codigo_ciencia, ci.nombre
ORDER BY COUNT(rt.codigo_tema) DESC;

/*TOP 3 CIENCIA CON MAS RESPUESTAS*/
SELECT * FROM respuestas_ciencia WHERE ROWNUM < 4;

/********************************************************************************************/

/*TOTAL DE TEMAS POR CADA USUARIO EN GENERAL*/
CREATE OR REPLACE VIEW temas_por_usuario AS
SELECT DISTINCT u.registro, ur.codigo_rol, u.nombre, u.fotografia, COUNT(t.codigo_tema) AS "temas"
FROM tema t
INNER JOIN usuario u ON t.registro_usuario_creacion = u.registro AND u.estado = 0
INNER JOIN usuario_rol ur ON ur.registro = u.registro AND ur.estado = 0
WHERE t.estado <> 2
GROUP BY u.registro, u.nombre, u.fotografia, ur.codigo_rol
ORDER BY COUNT(t.codigo_tema) DESC;

/*TOP 5 CATEDRATICO CON MAS TEMAS*/
SELECT * FROM temas_por_usuario WHERE codigo_rol = 3 AND ROWNUM < 6;
/*TOP 5 ESTUDIANTES CON MAS TEMAS*/
SELECT * FROM temas_por_usuario WHERE codigo_rol = 2 AND ROWNUM < 6;

/*TOTAL DE TEMAS POR CADA USUARIO POR CIENCIA*/
CREATE OR REPLACE VIEW temas_usuario_ciencia AS
SELECT DISTINCT u.registro, ur.codigo_rol, u.nombre, u.fotografia, c.codigo_ciencia, ci.nombre "ciencia", COUNT(t.codigo_tema) AS "temas"
FROM tema t
INNER JOIN usuario u ON t.registro_usuario_creacion = u.registro AND u.estado = 0
INNER JOIN usuario_rol ur ON ur.registro = u.registro AND ur.estado = 0
INNER JOIN categoria c ON c.codigo_tema = t.codigo_tema AND c.codigo_ciencia IS NOT NULL AND c.estado = 0
INNER JOIN ciencia ci ON ci.codigo_ciencia = c.codigo_ciencia  AND ci.estado = 0
WHERE t.estado <> 2
GROUP BY u.registro, u.nombre, u.fotografia, ur.codigo_rol, c.codigo_ciencia, ci.nombre
ORDER BY COUNT(t.codigo_tema) DESC;

/*TOP 5 CATEDRATICO CON MAS TEMAS FILTRADO POR CIENCIA*/
SELECT * FROM temas_usuario_ciencia WHERE codigo_rol = 3 AND codigo_ciencia = 3 AND ROWNUM < 6;
/*TOP 5 ESTUDIANTES CON MAS TEMAS FILTRADO POR CIENCIA*/
SELECT * FROM temas_usuario_ciencia WHERE codigo_rol = 2 AND codigo_ciencia = 2 AND ROWNUM < 6;

/*FIN ESTADISTICAS*/


